import datetime
from flask import Blueprint, request, jsonify
from prophet import Prophet
import matplotlib
import yfinance as yf

matplotlib.use('Agg')
bp = Blueprint('main', __name__, url_prefix='/')


@bp.route("/api/flask/test", methods=['GET'])
def flaskTest() :
    return "return flaskTest"

@bp.route("/stock/price/daily", methods=["GET"])
def stock_price_daily(symbol, range):
    if not symbol:
        return jsonify({"error": "Missing 'symbol' parameter"}), 400

    end_date = datetime.date.today() - datetime.timedelta(days=1)
    start_date = end_date - datetime.timedelta(days=int(range)) - datetime.timedelta(days=1)

    df = yf.download(symbol, start=start_date, end=end_date + datetime.timedelta(days=1))

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

    df["y"] = df["y"].round(2)
    return df

# https://facebook.github.io/prophet/docs/quick_start.html
@bp.route("/api/flask/prophet", methods=["GET"])
def stock_price_prophet():
    try:
        symbol = request.args.get("symbol")
        range = request.args.get("range")

        if not symbol:
            return jsonify({"error": "Missing 'symbol' parameter"}), 400
        if not range or not range.isdigit():
            return jsonify({"error": "Invalid or missing 'range' parameter"}), 400
        

        df = stock_price_daily(symbol, range)
        m = Prophet(weekly_seasonality=False)  # 모델 생성
        m.fit(df)  # 피팅

        future = m.make_future_dataframe(periods=1)
        forecast = m.predict(future)
        
        return jsonify({
            "predict_price": round(forecast[['yhat']].tail(1).values[0][0],4)
        })
    except Exception as error:
        return jsonify({"error": str(error)}), 500
    

    