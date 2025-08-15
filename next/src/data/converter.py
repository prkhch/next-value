# https://velog.io/@yeguu037/csv-%ED%8C%8C%EC%9D%BC-json%EC%9C%BC%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EA%B8%B0-with-python

import csv
import json

# csv 파일 경로
# csv_file_path = 'kospi.csv'
# csv_file_path = 'kosdaq.csv'
csv_file_path = 'nasdaq.csv'
# csv_file_path = 'nyse.csv'

# csv 파일 읽어오기
with open(csv_file_path, 'r', encoding='cp949') as f:
    reader = csv.reader(f)
    next(reader)  # 첫 줄 skip

    # 각 라인마다 딕셔너리 생성 후 리스트에 추가
    data = []
    for line in reader:
        # d = {
        #     'Symbol': line[0]+".KS",
        #     'Name': line[1],
        #     'Exchange': "KOSPI"
        # }
        # d = {
        #     'Symbol': line[0]+".KQ",
        #     'Name': line[1],
        #     'Exchange': "KOSDAQ"
        # }
        d = {
            'Symbol': line[0],
            'Name': line[1],
            'Exchange': "NASDAQ"
        }
        # d = {
        #     'Symbol': line[0],
        #     'Name': line[1],
        #     'Exchange': "NYSE"
        # }
        
        data.append(d)

# json string으로 변환
json_string = json.dumps(data, ensure_ascii=False, indent=2)

# print(json_string)

# txt 파일로 저장할 경로
txt_file_path = 'data.txt'

# txt 파일 쓰기
with open(txt_file_path, 'w', encoding='utf-8') as f:
    f.write(json_string)