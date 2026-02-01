from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

# GET all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    conn.close()
    return jsonify(tasks)

# ADD task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (title, description) VALUES (%s, %s)",
        (data["title"], data["description"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Task added"}), 201

# UPDATE status
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE tasks SET status=%s WHERE id=%s",
        (data["status"], id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Task updated"})

# DELETE task
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id=%s", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
