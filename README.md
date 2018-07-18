# Checkmate - 2018

## How to run?
#### Setting up the Development Environment
For python3 virtual environment:

1. To install python2.7 virtual environment, [refer this](https://help.dreamhost.com/hc/en-us/articles/215489338-Installing-and-using-virtualenv-with-Python-2)

2. The base directory contains 'requirements.txt' file. To replicate the same environment:
   ```bash
   pip install -r requirements.txt
   ```

#### Running for the first time
1. To migrate databases:<br>
   ```bash
    python manage.py makemigrations
    python manage.py migrate
   ```
2. Start the development server:
   ```bash
   python manage.py runserver
   ```
Please file an issue if you face any problem while running the app.<br> 
Improvements are always welcome.<br>
Feel free to fork the repository and send in pull requests with proper commit messages.
