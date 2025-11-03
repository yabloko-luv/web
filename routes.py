from flask import Flask, render_template, jsonify
from flask_cors import CORS
# пока весь фласк здесь, надо будет разделить
app = Flask(__name__, static_folder='build', template_folder='build')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/catalog.html')
def catalog():
    return render_template('catalog.html')

@app.route('/catalog_tasks.html')
def catalog_tasks():
    return render_template('catalog_tasks.html')

@app.route('/reviews.html')
def reviews():
    return render_template('reviews.html')

@app.route('/api/statistics')
def statistic():
    return jsonify({
        "status" : "success",
        "data" : { "students" : 300,
                  "avg_score" : 84,
                  "winners_count" : 100 }})

@app.route('/api/courses') # мок массивы пока нет бд + заглушки
def courses():
    courses = [
        {
            "course_id" : 1,
            "course_name" : "Подготовка ЕГЭ по профильной математике",
            "discreption" : "Полная и качественная подготовка к экзамену",
            "price" : 15000
        },

        {
            "course_id" : 2,
            "course_name" : "Подготовка ЕГЭ по русскому языку",
            "discreption" : "Полная и качественная подготовка к экзамену",
            "price" : 10000
        }
    ]
    return jsonify({"status" : "success", "data" : courses})

@app.route('/api/courses/<int:course_id>')
def get_course(course_id):
    course = {
        "id" : course_id,
        "title" : f"Курс {course_id}",
        "lessons" : [
            {
                "id" : 1,
                "title" : "ДЗ 1",
                "tasks" : 10
            },

            {
                "id" : 2,
                "title" : "ДЗ 2",
                "tasks" : 15
            }
        ]
    }
    return jsonify({"status" : "success", "data" : course})
    
@app.route('/api/tasks')
def get_tasks():
    task = [
        {
            "id" : 1,
            "task_name" : "Решение уравнений",
            "tasks_in" : 10,
            "subject" : "Математика",
            "difficulty" : "Нормальное"
        },
        {
            "id" : 2,
            "task_name" : "Полиндромы",
            "tasks_in" : 5,
            "subject" : "Математика",
            "difficulty" : "Сложное"
        }
    ]
    return jsonify({"status" : "success","data" : task})

@app.route('/api/reviews') 
def get_reviews():
    reviews = [
        {
            "id" : 1,
            "author" : "Мария Мариновна",
            "text" : "имба!",   
            "avg_score" : 70,          
        },
        {
            "id" : 2,
            "author" : "Мария Мариновна",
            "text" : "имба!",   
            "avg_score" : 70,          
        }
    ]
    return jsonify({"status" : "success", "data" : reviews})

@app.route('/api/bundles')
def get_bundles():
    bundles = [
        {
            "id": 1,
            "title": "Подготовка к ЕГЭ",
            "description": "Полная подготовка к единому государственному экзамену",
            "price" : 15000
        },
        {
            "id": 2,
            "title": "Подготовка к ОГЭ", 
            "description": "Эффективная подготовка к основному государственному экзамену",
        }
    ]
    return jsonify({"status": "success", "data": bundles})

@app.route('/api/contact', methods=['POST']) # на будущее
def contact_form():
    return jsonify(
        {
            "status" : "success",
            "message" :  "Отправлено"
        }
    ), 201

@app.route('/api/auth/register', methods=['POST']) # на будущее
def register():
    return jsonify({
        "status": "success",
        "message": "Пользователь зарегистрирован"
    }), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)