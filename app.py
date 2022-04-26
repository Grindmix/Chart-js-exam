from flask import Flask, jsonify
import pymysql
from pymysql.cursors import DictCursor

app = Flask(__name__, static_folder="static")

dbh = pymysql.connect(
    host='server',
    user='user',
    password='password',
    db='db_name',
    charset='utf8mb4',
    cursorclass=DictCursor,
    autocommit=True
)

@app.route('/')
def index():
    index = open("static/bar.html", "r")
    page = index.read()
    index.close()
    return page

@app.route('/get_tsmc_data', methods=['GET', 'POST'])
def get_tsmc_data():
    with dbh.cursor() as cur:
        cur.execute('SELECT * FROM vd_tsmc')
        rows = cur.fetchall()
        print(rows)

    return jsonify(rows)


app.run(debug=True)