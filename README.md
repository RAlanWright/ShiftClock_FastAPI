# ShiftClock_FastAPI
The aim for this web app is to manage shifts for one or more users.

## Backend
* Using the Python FastAPI library for speed/performance.
* Containerized using Docker for ease of setup.

## Frontend
Using React 👍

## What is this project supposed to do?
This uses a REST API to handle shift operations.
* View all shifts
* View single shift by id
* Add a new shift
* Edit a shift
* Delete a shift

# Backend Setup
* ```docker-compose up -d --build```
* ```docker-compose up```
* View the API at `localhost:8002/docs`

![image](https://user-images.githubusercontent.com/31636206/125524502-11bc7e40-2289-4e57-896b-db001bb0e9db.png)

## API Documentation via Swagger UI:
![image](https://user-images.githubusercontent.com/31636206/125521109-ade0401e-9fae-4922-a0f2-d923969c93e8.png)

### Get-All-Shifts:
![image](https://user-images.githubusercontent.com/31636206/125522495-6c88ac36-8c0f-4053-9b6a-e9126b37d03f.png)

### Create-Shift:
![image](https://user-images.githubusercontent.com/31636206/125522787-031caf41-4fa6-49bc-86b6-ebcc803cb0b9.png)
![image](https://user-images.githubusercontent.com/31636206/125522830-f4f218b6-f8cc-4b4c-b38a-87515c223885.png)

### Update-Shift-By-Id:
![image](https://user-images.githubusercontent.com/31636206/125523060-7b817cc3-5ccd-4475-b5d9-42d17966fdd6.png)

### Delete-Shift-By-Id:
![image](https://user-images.githubusercontent.com/31636206/125523226-eeb6568b-7854-4007-8baa-00aad204fe55.png)
![image](https://user-images.githubusercontent.com/31636206/125523436-33a00df8-9ca2-45da-810a-f412fc29db3b.png)

# Frontend Setup
* ```cd frontend```
* ```yarn``` -- This should be the equivalent of `yarn add` or `yarn install`
* ```yarn start```

#### Below is an earlier iteration of the frontend:
![image](https://user-images.githubusercontent.com/31636206/125524830-597f3455-0ea4-49ac-be7e-7f88cc7c238e.png)

#### More recent iteration:
![image](https://user-images.githubusercontent.com/31636206/125524916-62421ee1-65f8-4d2e-9900-c8ac08567faa.png)

## Known Issues:
* Current iteration of the frontend doesn't compile. I'm in the process of working through some bugs.
* No shift constraints (view all shifts between start and end time, ordered by start time) are ready yet.
* Created shifts can overlap for the same user.
* User authentication isn't fully set up yet.

