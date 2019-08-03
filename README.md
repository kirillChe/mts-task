# Test task for MTS_IT

### You must have installed Docker+docker-compose.

Steps:
1. Clone the repository: 
  `git clone https://github.com/kirillChe/mts-task.git`
2. Go to the created directory:
  `cd mts-task`
3. Run app:
  `docker-compose up -d --build`
4. Enter to the backend container for filling database:
  `docker exec -it backmts /bin/bash`
5. Fill the database:
  `npm run db:fill`
6. Enjoy!

## The app is running on port 3101
## PHPMyAdmin is on port 6111

  
