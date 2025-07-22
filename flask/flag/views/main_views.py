import datetime
import time
from flask import Blueprint, request, jsonify
from io import BytesIO
import pandas as pd
from prophet import Prophet
from prophet.plot import add_changepoints_to_plot, plot_weekly, plot_yearly
import matplotlib,base64, json, requests
import yfinance as yf

matplotlib.use('Agg')
bp = Blueprint('main', __name__, url_prefix='/')

print("main_views")

# def encode_image_to_base64(fig):
#     buf = BytesIO()
#     fig.savefig(buf, format='png')
#     buf.seek(0)
#     image_base64 = base64.b64encode(buf.read()).decode('utf-8')
#     buf.close()
#     return image_base64


# def read_file(fileData):
#     file_extension = fileData.filename.split('.')[-1]
#     file_stream = BytesIO(fileData.read())

#     if file_extension.lower() == 'csv':
#         df = pd.read_csv(file_stream, encoding='cp949')
#     elif file_extension.lower() in ['xls', 'xlsx']:
#         df = pd.read_excel(file_stream, engine='openpyxl')
#     else:
#         raise ValueError("Unsupported file format")

#     return df


@bp.route("/api/flask/test", methods=['GET'])
def flaskTest() :
    return "return flaskTest"

@bp.route("/stock/price/daily", methods=["GET"])
def stock_price_daily(symbol):
    if not symbol:
        return jsonify({"error": "Missing 'symbol' parameter"}), 400

    end_date = datetime.datetime.today()
    start_date = end_date - datetime.timedelta(days=365)

    df = yf.download(symbol, start=start_date, end=end_date)
    if df.empty:
        return jsonify({"error": f"No data found for symbol '{symbol}'"}), 404
    # Price            Close        High         Low        Open    Volume
    # Ticker            AAPL        AAPL        AAPL        AAPL      AAPL
    # Date
    # 2024-07-22  222.917480  226.719691  222.051520  225.953271  48201800
    # 2024-07-23  223.962601  225.883625  221.643445  223.325580  39960300

    df.reset_index(inplace=True)
    # Price        Date       Close        High         Low        Open    Volume
    # Ticker                   AAPL        AAPL        AAPL        AAPL      AAPL
    # 0      2024-07-22  222.917480  226.719691  222.051520  225.953271  48201800
    # 1      2024-07-23  223.962601  225.883625  221.643445  223.325580  39960300

    df = df[["Date", "Close"]]
    # Price        Date       Close
    # Ticker                   AAPL
    # 0      2024-07-22  222.917480
    # 1      2024-07-23  223.962601

    df.columns = ["ds", "y"] 
    #             ds           y
    # 0   2024-07-22  222.917480
    # 1   2024-07-23  223.962601

    return df

@bp.route("/prophet/stock/price", methods=["GET"])
def stock_price_prophet():
    symbol = request.args.get("symbol", "AAPL")
    df = stock_price_daily(symbol)

    model = Prophet()  # 모델 생성
    model.fit(df)  # 피팅

    future = model.make_future_dataframe(periods=1)
    print("ft@@@@", future)
    forecast = model.predict(future)
    print("fc@@@", forecast)

    predicted = forecast.iloc[-1][["ds", "yhat"]]
    return 1
    return predicted

# @bp.route("/api/flask/pandas", methods=['POST'])
# def toPandas():
#     fileData = request.files.get('file')
#     if fileData:
#         df = read_file(fileData)

#         if df.columns[0] != 'Date':
#             return jsonify({'error': 'The first column must be named "Date".'}), 400

#         # try:
#         #     pd.to_datetime(df['Date'], format='%Y-%m-%d')
#         # except ValueError:
#         #     return jsonify({'error': 'The Date column must be in "yyyy-mm-dd" format.'}), 400

#         # try:
#         #     df.iloc[1:, 1:].apply(pd.to_numeric)
#         # except ValueError:
#         #     return jsonify({'error': 'Data must be numeric.'}), 400

#         if len(df.columns) > 6:
#             return jsonify({'error': 'Cannot exceed 5 "y" columns.'}), 400

#         return df.to_json(orient='records')
#     else:
#         return "File not received"

# @bp.route("/api/flask/prophet", methods=['POST'])
# def toProphet():
#     print("files:", request.files)
#     print("form:", request.form)
#     file_data = request.files.get('file')
#     string_options = request.form.get("options")
#     options = json.loads(string_options)

#     min_row_count = 10
#     max_row_count = 5000
#     min_days_range = 30
#     max_days_range = 365 * 3  # 3년
#     if file_data:
#         df = read_file(file_data)
#         images_dict = {}

#         try :
#             for column in df.keys()[1:]:
#                 single_df = df[['Date', column]]  # 데이터셋 분리
#                 single_df = single_df.rename(columns={'Date': 'ds', column: 'y'})  # 데이터셋 열이름 변경
#                 single_df['ds'] = pd.to_datetime(single_df['ds'], errors='coerce')
#                 # 날짜 범위 검사
#                 date_range_days = (single_df['ds'].max() - single_df['ds'].min()).days
#                 if date_range_days < min_days_range:
#                     return jsonify({'error': f"'{column}'의 날짜 범위가 너무 짧습니다. 최소 {min_days_range}일 이상 필요합니다."}), 400
#                 if date_range_days > max_days_range:
#                     return jsonify({'error': f"'{column}'의 날짜 범위가 너무 깁니다. 최대 {max_days_range // 365}년 이하로 줄여주세요."}), 400

#                 # 행 수 검사
#                 row_count = single_df.shape[0]
#                 if row_count < min_row_count:
#                     return jsonify({'error': f"'{column}'의 행 수가 너무 적습니다. 최소 {min_row_count}개 이상 필요합니다."}), 400
#                 if row_count > max_row_count:
#                     return jsonify({'error': f"'{column}'의 행 수가 너무 많습니다. 최대 {max_row_count}개 이하로 줄여주세요."}), 400

#                 m = Prophet(
#                     growth=options["growth"],
#                     changepoint_prior_scale=options["cpScale"],
#                     changepoints=options["cpList"],
#                     holidays_prior_scale=options["holidayScale"],
#                     yearly_seasonality=options["yearlyScale"],
#                     weekly_seasonality=options["weeklyScale"],
#                     seasonality_mode=options["seasonMode"],
#                     seasonality_prior_scale=options["seasonScale"]
#                 )  # 모델 생성
#                 if options["growth"] == 'logistic':
#                     if options["dfCap"]:
#                         single_df['cap'] = options["dfCap"]
#                     if options["dfFloor"]:
#                         single_df['floor'] = options["dfFloor"]
#                 if options["holidays"] != "none":
#                     m.add_country_holidays(country_name=options["holidays"])  # 공휴일 국가코드 설정
#                 m.fit(single_df)  # 피팅
#                 if 'yearly' in m.seasonalities:
#                     plot_yearly(m)
#                 if 'weekly' in m.seasonalities:
#                     plot_weekly(m)
#                 future = m.make_future_dataframe(periods=options["periods"])  # 예측 기간
#                 if options["growth"] == 'logistic':
#                     if options["ftCap"]:
#                         future['cap'] = options["ftCap"]
#                     if options["ftFloor"]:
#                         future['floor'] = options["ftFloor"]
#                 forecast = m.predict(future)  # 예측
#                 # print(forecast)
#                 # print(m.growth)
#                 # print(m.changepoint_prior_scale)
#                 # print(m.changepoints)
#                 # print(m.holidays_prior_scale)
#                 # print(m.yearly_seasonality)
#                 # print(m.weekly_seasonality)
#                 # print(m.seasonality_mode)
#                 # print(m.seasonality_prior_scale)
#                 # print(m.country_holidays)

#                 # y ds
#                 fig1 = m.plot(forecast, figsize=(16, 9))  # 이미지 저장
#                 add_changepoints_to_plot(fig1.gca(), m, forecast, threshold=options["cpThreshold"])  # change_points

#                 # components ds
#                 fig2 = m.plot_components(forecast, figsize=(9, 9))

#                 # save local
#                 # fig1.savefig('static/images/prophet_plot.png')
#                 # fig2.savefig('static/images/prophet_plot2.png')

#                 # image to json
#                 encoded_fig1 = encode_image_to_base64(fig1)
#                 encoded_fig2 = encode_image_to_base64(fig2)
#                 images_dict[column] = [encoded_fig1, encoded_fig2]
#         except ValueError as e :
#             return jsonify({'error': str(e)}), 400
#         except RuntimeError as e:
#             error_message = str(e)
#             exception_start = error_message.find("Exception: ")
#             if exception_start != -1:
#                 custom_message = error_message[exception_start + len("Exception: "):].strip()
#             else:
#                 custom_message = error_message
#             return jsonify({'error': custom_message}), 400

#         images_json = json.dumps(images_dict)
#         return images_json
#     else:
#         return "File not received"
