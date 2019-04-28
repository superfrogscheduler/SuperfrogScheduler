#!/bin/bash
  
cd /home/ubuntu/SuperfrogScheduler/SuperFrogSchedule;
nohup python3 manage.py runserver 0.0.0.0:8000 & &> /tmp/error.log;

cd /home/ubuntu/SuperfrogScheduler/frontend;
ng build --prod;
sudo cp -r dist /var/www/angular;
sudo service nginx restart;



#Acknowledgement: Hunter Merritt provided some outside help deploying 
#the website properly to run without leaving the terminal open
