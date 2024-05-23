
-- USER ID
-- USER
-- DATES

-- [
--     {
--         date : '12/12/2002',
--         food : [
--             {
--                 'name': 'cheese',
--                 'calories': 393.9,
--                 'serving_size_g': 100,
--                 'fat_total_g': 33,
--                 'fat_saturated_g': 18.9,
--                 'protein_g': 22.7,
--                 'sodium_mg': 661,
--                 'potassium_mg': 459,
--                 'cholesterol_mg': 100,
--                 'carbohydrates_total_g': 3.2,
--                 'fiber_g': 0,
--                 'sugar_g': 0.5,
--             },
--         ],
--         workout : [
--             {
--                 'exercise' : 'pull-ups',
--                 'sets' : 2,
--                 'reps' : 15
--             },
--         ]
--     },
-- ]

CREATE TABLE exerciseDB (
    id SERIAL PRIMARY KEY,
    users VARCHAR(20),
    dates JSONB
);

INSERT INTO exerciseDB (users, dates)
VALUES (
    'JohnDoe',
    '[
        {
            "date": "Wed Jul 28 1993",
            "food": [
                {
                    "name": "cheese",
                    "calories": 393.9,
                    "serving_size_g": 100,
                    "fat_total_g": 33,
                    "fat_saturated_g": 18.9,
                    "protein_g": 22.7,
                    "sodium_mg": 661,
                    "potassium_mg": 459,
                    "cholesterol_mg": 100,
                    "carbohydrates_total_g": 3.2,
                    "fiber_g": 0,
                    "sugar_g": 0.5
                }
            ],
            "workout": [
                {
                    "exercise": "pull-ups",
                    "sets": 2,
                    "reps": 15
                }
            ]
        }
    ]'::jsonb
);

SELECT * FROM exercisedb




