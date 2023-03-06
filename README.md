# zoochecker

### Описание:
Если вы идете в кафе, Zoochecker поможет оцифровать кассовый чек и разделить позиции между друзьями. Zoochecker поможет увидеть кто сколько должен тому, кто расплачивался с официантом. Добавляйте фото чека, редактируйте и распределяйте позиции в чеке, сохраняйте и смотрите кому сколько переводить.

Это Pet-проект по созданию SPA приложения на стеке React + FastAPI/SQLAlchemy/Pydantic/Alembic. Распознавание чека (Optical Text Recognition) выполняется внешним сервисом через API. База данных - PostgreSQL. HTTP сервер - uvicorn. Раздачу статики и проксирование на uvicorn выполняет сервер nginx. Деплой в Docker контейнерах.

### Используемые технологии
<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" /> <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />

    ```
    alembic==1.9.3
    fastapi==0.91.0
    psycopg2==2.9.5
    pydantic==1.10.4
    requests==2.28.2
    SQLAlchemy==2.0.3
    SQLAlchemy-ImageAttach==1.1.0
    uvicorn==0.20.0
    axios==1.3.3
    react==18.2.0
    react-edit-text==5.0.2
    react-select==5.7.0
    ```

### Запуск проекта ⚙️
1. В терминале клонировать репозиторий и перейти в подпапку zoochecker где лежит docker-compose:
    ```
    git clone git@github.com:basicShade/zoochecker.git
    cd zoochecker/
    ls docker-compose.yml
    ```
2. В папке zoochecker создать .env файл со следующим содержанием по умолчанию 🔒
    ```
    DB_ENGINE=postgresql
    DB_NAME=postgres
    POSTGRES_USER=... (придумать имя пользователя)
    POSTGRES_PASSWORD=... (придумать пароль)
    DB_HOST=db
    DB_PORT=5432
    ```

3. Запустить docker-compose:
    ```
    docker-compose up --build -d
    ```

4. Выполнить миграции, загрузить статику и данные, создать суперпользователя:
    ```
    docker-compose exec backend alembic upgrade head
    ```

   Страницы, доступные после запуска:
    ```
    Страница добавления чека: http://localhost/
    Страница со списком чеков: http://localhost/receipts/
    ```

### Планы по доработке:
    ```
    добавить модель пользователя
    добавить пагинацию
    изучить открытые библиотеки для Optical Text Recognition
    создать список платных и бесплатных OCR сервисов
    интегрировать приложение в telegram
    ```
