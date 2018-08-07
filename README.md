# Checkmate - 2018

## API Endpoints
- Account
  - register/ 
  - login/
  - logout/
- Manual
  - man/
- game/
- leaderboard/
- congrats/

## ToDo:
- Integration with Front-end
- Leaderboard
- GameSwitch
- Timer 

## How to run?
#### Setting up the Development Environment

1. To install python2.7 virtual environment
  ```bash
  sudo apt-get install python2.7
  sudo apt-get install python-pip
  pip install virtualenv
  cd ~
  virtualenv -p python2.7 my_env
  ```
2. For activating virtual environment
  ```bash
  cd ~
  source my_env/bin/activate
  ```

3. Navigate to the base directory of Checkmate 2018. It contains 'requirements.txt' file. To replicate the same environment:
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
   
#### Deactivating virtual environment at end of session
   ```bash
   deactivate
   ``` 
   
Please file an issue if you face any problem while running the app.<br> 
Improvements are always welcome.<br>
Feel free to fork the repository and send in pull requests with proper commit messages.
