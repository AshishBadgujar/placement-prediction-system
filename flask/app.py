from flask import Flask, render_template, request,jsonify
from joblib import load
import json

app = Flask(__name__)

model=load('model.joblib')

@app.route('/',methods=['GET'])
def home():
    return "Hello From Flask"

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == "POST":
        data=request.get_json()

        qa=float(data['qa'])
        lr=float(data['lr'])
        va=float(data['va'])
        programming=float(data['programming'])
        cn=float(data['cn'])
        dsa=float(data['dsa'])
        ml=float(data['ml'])
        os=float(data['os'])
        oop=float(data['oop'])
        dbms=float(data['dbms'])
        cgpa=float(data['cgpa'])
        activeBacklog=int(data['activeBacklogs'])
        deadBacklog=int(data['deadBacklogs'])

        result = model.predict([[qa,lr,va,programming,cn,dsa,ml,os,oop,dbms,cgpa]])
        # result = model.predict([[19,19,19,19,90,90,90,90,90,90,9]])
        if result[0] == 1:
            print("yes")
            return jsonify({"success":True}),200
        if result[0] == 0:
            print("no")
            return jsonify({"success":False}),200
        return jsonify({"error":"failed"}),400

if __name__ == '__main__':
	app.run()
