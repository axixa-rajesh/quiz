# Quiz Management System 15-Day Sequelize Coding Plan

## 1. Purpose of This Plan

This document explains clearly what the students need to build for the quiz management system.

The goal is to help students focus on practical coding work using:

- React for the frontend
- Node.js and Express for the backend
- `sequelize` to handle the SQL database
- `mysql2` as the SQL driver
- `sequelize-cli` for migrations and seeders

This plan is written so students know:

- what modules to build
- what database models to create
- what APIs to write
- what pages to develop
- what rules to follow
- what to keep in mind while working

## 2. Technology Direction

The students should build the project using the following stack:

- `React` for frontend pages and components
- `Node.js + Express` for backend APIs
- `sequelize` for SQL database handling
- `sequelize-cli` for migrations and seeders
- `mysql2` for MySQL connection
- `dotenv` for environment variables
- `JWT` for authentication

### Important Rule

Students should use Sequelize for normal database operations instead of writing raw SQL everywhere.

Students should mainly use:

- Sequelize models
- Sequelize migrations
- Sequelize seeders
- Sequelize associations
- Sequelize validations
- Sequelize transactions

Raw SQL should be used only when:

- a report query becomes too complex in plain Sequelize
- query performance is measured and found too slow in Sequelize
- a database-specific feature cannot be handled properly in Sequelize

## 3. Main Project Modules

The quiz management system should cover these modules:

- login and authentication
- users and roles
- subjects and topics
- question bank
- MCQ option management
- quiz format management
- quiz creation and publishing
- quiz attempt flow
- results and review
- dashboard and reports

### Admin Format Requirement

The system must support configurable quiz formats.

This means:

- admin can create quiz formats such as `practice`, `exam`, or `mock_test`
- each format can control the `number of options` shown per question
- each format can control whether `hint`, `explanation`, `reference_note`, or `difficulty_level` is shown
- each format can control whether the correct answer is shown immediately or only after submission
- each format can control timer, randomization, negative marking, and maximum attempt count
- quizzes should use a selected format so the same rules are applied consistently

## 4. Student Responsibility

| Student     | Main Work                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Student 1` | React app structure, routing, layouts, shared components, auth pages, CRUD pages, quiz attempt pages, results pages, reports pages, and API integration   |
| `Student 2` | Express project setup, Sequelize configuration, authentication, users, roles, quiz formats, quizzes, attempts, results, reports, middleware, and services |
| `Student 3` | subjects, topics, question bank, question options, quiz-question mapping, migrations, seeders, content APIs, and shared quiz data setup                   |

## 5. What Must Be Built By The End

### 5.1 Sequelize Database Layer

The students must create:

- database connection configuration
- `models/` folder
- `migrations/` folder
- `seeders/` folder
- association setup file such as `models/index.js`
- Sequelize models for all main quiz entities
- migrations for all tables
- seed data for sample project records
- foreign key relationships
- unique constraints
- question option count validation logic
- quiz format visibility logic
- score calculation logic
- attempt number logic
- transaction-based write logic for important flows

### 5.2 Backend Layer

The backend should include:

- auth routes
- user and role routes
- subject routes
- topic routes
- question bank routes
- quiz format routes
- quiz routes
- attempt routes
- result routes
- dashboard routes
- report routes

The backend should also include:

- environment variable setup
- Sequelize initialization
- JWT authentication
- role authorization
- request validation
- common response format
- global error handling
- business logic service layer
- audit logging for important actions
- transactions for multi-step operations

### 5.3 Frontend Layer

The frontend should include:

- login page
- dashboard page
- users page
- subjects page
- topics page
- question bank page
- quiz formats page
- quizzes page
- quiz attempt page
- results page
- reports page

The frontend should also include:

- sidebar
- navbar
- protected routes
- reusable form components
- reusable table component
- modal component
- status badge component
- API service files
- loading states
- empty states
- error messages
- form validation

## 6. Required Sequelize Models

### 6.1 Auth and Staff Models

| Model  | Important Fields                                                                                           | Main Use                                     |
| ------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `Role` | `role_id`, `role_name`, `description`, `status`, `created_at`, `updated_at`                                | Store system roles such as admin and student |
| `User` | `user_id`, `full_name`, `email`, `phone`, `password_hash`, `role_id`, `status`, `created_at`, `updated_at` | Store user login and account details         |

### 6.2 Quiz Content Models

| Model            | Important Fields                                                                                                                                                                                                                                                                                                                    | Main Use                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `Subject`        | `subject_id`, `subject_name`, `subject_code`, `description`, `status`, `created_at`, `updated_at`                                                                                                                                                                                                                                   | Store broad subject areas such as math or science      |
| `Topic`          | `topic_id`, `subject_id`, `topic_name`, `description`, `status`, `created_at`, `updated_at`                                                                                                                                                                                                                                         | Store topic areas inside a subject                     |
| `Question`       | `question_id`, `subject_id`, `topic_id`, `question_text`, `difficulty_level`, `hint_text`, `explanation`, `reference_note`, `media_url`, `status`, `created_by`, `created_at`, `updated_at`                                                                                                                                         | Store the main MCQ question content                    |
| `QuestionOption` | `option_id`, `question_id`, `option_label`, `option_text`, `is_correct`, `sort_order`, `created_at`, `updated_at`                                                                                                                                                                                                                   | Store options belonging to each MCQ question           |
| `QuizFormat`     | `format_id`, `format_name`, `options_per_question`, `show_hint`, `show_explanation`, `show_reference_note`, `show_difficulty`, `show_correct_answer_after_submit`, `randomize_questions`, `randomize_options`, `time_limit_minutes`, `passing_marks`, `negative_marking`, `max_attempt_count`, `status`, `created_at`, `updated_at` | Store reusable quiz display and scoring rules          |
| `Quiz`           | `quiz_id`, `format_id`, `subject_id`, `title`, `description`, `instructions`, `total_marks`, `total_questions`, `availability_start`, `availability_end`, `publish_status`, `created_by`, `created_at`, `updated_at`                                                                                                                | Store quiz-level data and publishing information       |
| `QuizQuestion`   | `quiz_question_id`, `quiz_id`, `question_id`, `marks`, `negative_marks`, `display_order`, `created_at`, `updated_at`                                                                                                                                                                                                                | Store which questions belong to a quiz and their marks |

### 6.3 Attempt and Tracking Models

| Model           | Important Fields                                                                                                                                                                                                            | Main Use                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `QuizAttempt`   | `attempt_id`, `quiz_id`, `user_id`, `attempt_number`, `started_at`, `submitted_at`, `time_taken_seconds`, `score_obtained`, `correct_count`, `wrong_count`, `unanswered_count`, `result_status`, `created_at`, `updated_at` | Store one full user attempt for one quiz     |
| `AttemptAnswer` | `attempt_answer_id`, `attempt_id`, `quiz_question_id`, `option_id`, `is_correct`, `marks_awarded`, `answered_at`, `created_at`, `updated_at`                                                                                | Store the selected answer for each quiz item |
| `AuditLog`      | `log_id`, `user_id`, `action`, `entity_name`, `entity_id`, `old_value`, `new_value`, `created_at`                                                                                                                           | Track important changes made by users        |

## 7. Required Sequelize Associations

The students must define the following associations correctly:

- `Role.hasMany(User)` and `User.belongsTo(Role)`
- `Subject.hasMany(Topic)` and `Topic.belongsTo(Subject)`
- `Subject.hasMany(Question)` and `Question.belongsTo(Subject)`
- `Topic.hasMany(Question)` and `Question.belongsTo(Topic)`
- `User.hasMany(Question, { foreignKey: 'created_by' })` and `Question.belongsTo(User, { foreignKey: 'created_by' })`
- `Question.hasMany(QuestionOption)` and `QuestionOption.belongsTo(Question)`
- `QuizFormat.hasMany(Quiz)` and `Quiz.belongsTo(QuizFormat)`
- `Subject.hasMany(Quiz)` and `Quiz.belongsTo(Subject)`
- `User.hasMany(Quiz, { foreignKey: 'created_by' })` and `Quiz.belongsTo(User, { foreignKey: 'created_by' })`
- `Quiz.hasMany(QuizQuestion)` and `QuizQuestion.belongsTo(Quiz)`
- `Question.hasMany(QuizQuestion)` and `QuizQuestion.belongsTo(Question)`
- `User.hasMany(QuizAttempt)` and `QuizAttempt.belongsTo(User)`
- `Quiz.hasMany(QuizAttempt)` and `QuizAttempt.belongsTo(Quiz)`
- `QuizAttempt.hasMany(AttemptAnswer)` and `AttemptAnswer.belongsTo(QuizAttempt)`
- `QuizQuestion.hasMany(AttemptAnswer)` and `AttemptAnswer.belongsTo(QuizQuestion)`
- `QuestionOption.hasMany(AttemptAnswer)` and `AttemptAnswer.belongsTo(QuestionOption)`
- `User.hasMany(AuditLog)` and `AuditLog.belongsTo(User)`

### Important Quiz Format Association Rule

The `Quiz` model should always use one `QuizFormat`.

For this:

- `format_id` should be required for every quiz
- backend validation should reject questions that do not match the format's `options_per_question`
- visibility settings in `QuizFormat` should decide whether hint, explanation, reference note, and difficulty are sent to the student
- immediate feedback rules should be enforced consistently during attempt and review
- randomization rules should be applied without breaking answer checking

## 8. Sequelize Work That Must Be Done

### 8.1 Migrations

Students must create migrations for:

- all main tables
- primary keys
- foreign keys
- unique constraints such as `email`, `subject_code`, and `format_name`
- composite uniqueness where needed such as `topic_name` inside the same subject and `question_id` inside the same quiz mapping
- default values
- timestamps
- indexes for commonly searched columns
- status fields
- publish status fields

### 8.2 Seeders

Students must create seeders for:

- roles
- admin user
- sample student users
- subjects
- topics
- questions
- question options
- quiz formats
- sample quizzes
- sample quiz-question mappings
- sample attempts

### 8.3 Validations

Students must add validations for:

- required fields
- email format
- positive marks and time limits
- valid `difficulty_level` values
- valid `publish_status` values
- valid `result_status` values
- unique subject codes
- exactly one correct option for standard single-answer MCQs
- option count should match `QuizFormat.options_per_question`
- quiz end time should be after start time
- attempt count should not exceed the allowed limit
- the same question should not be added twice to the same quiz

### 8.4 Transactions

Students should use Sequelize transactions for operations such as:

- creating a quiz with multiple mapped questions
- publishing a quiz after validating question count, option count, and marks
- saving a full quiz submission and calculating score
- updating a question with all of its options
- changing quiz format rules while rechecking related quiz data

## 9. Recommended Folder Structure

### Backend

```text
backend/
  src/
    config/
    controllers/
    middlewares/
    migrations/
    models/
    routes/
    seeders/
    services/
    utils/
    validators/
  .env
  app.js
  server.js
```

### Frontend

```text
frontend/
  src/
    components/
    constants/
    hooks/
    layouts/
    pages/
    routes/
    services/
    utils/
```

## 10. Important Sequelize Commands

### 10.1 Backend Setup Commands

- `npm install express sequelize sequelize-cli`
- `npm install mysql2`
- `npm install dotenv cors bcryptjs jsonwebtoken`
- `npm install express-validator`
- `npm install -D nodemon`

### 10.2 Frontend Setup Commands

- `npm create vite@latest frontend -- --template react`
- `cd frontend`
- `npm install`
- `npm run dev`

### 10.3 Sequelize Initialization Commands

- `npx sequelize-cli init`
- `npx sequelize-cli model:generate`
- `npx sequelize-cli migration:create`
- `npx sequelize-cli seed:generate`

### 10.4 Database Execution Commands

- `npx sequelize-cli db:create`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`
- `npx sequelize-cli db:migrate:status`

### 10.5 Undo and Reset Commands

- `npx sequelize-cli db:migrate:undo`
- `npx sequelize-cli db:migrate:undo:all`
- `npx sequelize-cli db:seed:undo`
- `npx sequelize-cli db:seed:undo:all`

### 10.6 Run Commands

- `npm run dev`
- `npm start`

### 10.7 Most Important Commands For This Project

If students remember only the most important commands, these should be:

- `npx sequelize-cli init`
- `npx sequelize-cli db:create`
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`
- `npx sequelize-cli db:migrate:undo`
- `npx sequelize-cli db:seed:undo:all`

## 11. 15-Day Practical Coding Plan

### Day 1 - Create projects and install all required packages

- `Student 1`: Create the React project, set up `src/pages`, `src/components`, `src/layouts`, `src/routes`, and `src/services`, and create the initial page files.
- `Student 2`: Create the Express project, set up `src/config`, `src/routes`, `src/controllers`, `src/services`, `src/middlewares`, and `src/validators`, and install backend packages including `sequelize`, `sequelize-cli`, `mysql2`, `express`, `dotenv`, `jsonwebtoken`, and `bcrypt`.
- `Student 3`: Create the initial model and migration files for `Subject`, `Topic`, `Question`, `QuestionOption`, `QuizFormat`, `Quiz`, `QuizQuestion`, `QuizAttempt`, `AttemptAnswer`, and `AuditLog`.
- `Output`: Frontend app, backend app, packages, and starter model files completed.

### Day 2 - Initialize Sequelize and create base frontend/backend structure

- `Student 1`: Create page files for `Login`, `Dashboard`, `Users`, `Subjects`, `Topics`, `QuestionBank`, `QuizFormats`, `Quizzes`, `Attempt`, `Results`, and `Reports`, and add the base route map.
- `Student 2`: Run Sequelize initialization, connect `.env`, configure the database connection, and prepare `models`, `migrations`, and `seeders`.
- `Student 3`: Add the main fields for all quiz entities inside the model and migration files, including format rules such as option count, timer, feedback visibility, randomization, and negative marking.
- `Output`: Base project structure, Sequelize setup, and main schema files finished.

### Day 3 - Create auth and user database layer

- `Student 1`: Build `Login`, `Dashboard`, and `Users` pages with forms, tables, and route-level layout structure.
- `Student 2`: Create `Role` and `User` models and migrations with `email`, `password_hash`, `role_id`, `status`, and timestamps, and add the email unique constraint.
- `Student 3`: Create role and user seeders, including admin and sample student records.
- `Output`: User and role schema plus seed data completed.

### Day 4 - Create quiz setup models, migrations, and seeders

- `Student 1`: Build `Subjects`, `Topics`, `QuestionBank`, and `QuizFormats` pages with list sections, form sections, and filter sections.
- `Student 2`: Create shared backend constants for `status`, `difficulty_level`, `publish_status`, and `result_status`, and create `QuizFormat`, `Quiz`, and `AuditLog` models and migrations.
- `Student 3`: Create `Subject`, `Topic`, `Question`, and `QuestionOption` models and migrations, add `subject_code` uniqueness, add per-subject topic uniqueness, add question info fields, and create seeders for subjects, topics, questions, options, and sample quiz formats.
- `Output`: Setup-side schema and content seeders completed.

### Day 5 - Create quiz mapping, attempt schema, associations, and shared code

- `Student 1`: Build `Quizzes`, `Attempt`, `Results`, and `Reports` pages, and add the sidebar links for all pages.
- `Student 2`: Define all Sequelize associations in `models/index.js`, create `QuizAttempt` and `AttemptAnswer` models and migrations, and write the scoring, pass or fail, and audit-log logic.
- `Student 3`: Create the `QuizQuestion` model and migration with marks, negative marks, display order, and uniqueness rules for one question per quiz, and run the full migration set.
- `Output`: Full schema, associations, and shared data rules completed.

### Day 6 - Build shared frontend/backend utilities and authentication

- `Student 1`: Build reusable React components such as `Button`, `Input`, `Select`, `Table`, `Modal`, `PageHeader`, `StatusBadge`, and timer display components.
- `Student 2`: Build `POST /auth/login`, `GET /auth/me`, password comparison logic, JWT generation, auth middleware, role middleware, API response helpers, the global error handler, and the validator and service structure for quiz formats, quizzes, attempts, results, reports, and audit logging.
- `Student 3`: Create the validator and service structure for subjects, topics, questions, and question options, and complete role and user seeding.
- `Output`: Shared code and authentication layer completed.

### Day 7 - Connect auth and build user management

- `Student 1`: Connect the login page to the auth API, store the token and user data, create protected routes, create logout, add role-based sidebar visibility, and connect the main page layouts to API service files.
- `Student 2`: Implement `GET /users`, `POST /users`, `PUT /users/:id`, and `GET /roles`, and add validation for email, password, role, status, and required fields.
- `Student 3`: Create the user service helpers, role lookup helpers, and seed updates needed by the user management module.
- `Output`: Authentication and user management modules completed.

### Day 8 - Build and connect subjects, topics, and question bank

- `Student 1`: Connect the `Subjects`, `Topics`, and `QuestionBank` pages to real APIs and make create, edit, search, filter, and status toggle work.
- `Student 2`: Implement shared validation, permission checks, and response formatting for the content setup APIs, and wire hint, explanation, difficulty, and reference note fields into the backend response layer.
- `Student 3`: Implement `GET /subjects`, `POST /subjects`, `PUT /subjects/:id`, `GET /topics`, `POST /topics`, `PUT /topics/:id`, `GET /questions`, `POST /questions`, and `PUT /questions/:id`, and implement question option save rules.
- `Output`: Subjects, topics, and question bank modules completed.

### Day 9 - Build and connect quiz formats

- `Student 1`: Connect the `QuizFormats` page to real APIs and make create, edit, toggle, and rule preview work.
- `Student 2`: Implement `GET /quiz-formats`, `POST /quiz-formats`, and `PUT /quiz-formats/:id`, add backend validation so mapped questions match the format's option count, and define the scoring behavior rules for standard marking, negative marking, immediate feedback, and end-of-quiz feedback.
- `Student 3`: Create the quiz format service, seed sample quiz formats, and connect format values to question and quiz data rules.
- `Output`: Quiz format module completed.

### Day 10 - Build quiz backend for creation, mapping, and publishing

- `Student 1`: Build the final quiz builder UI with format selector, subject filter, question selector, marks fields, publish schedule, and summary section.
- `Student 2`: Create and finalize validators for quiz creation, quiz update, publish action, schedule validation, and duplicate question checks, and implement `POST /quizzes`, `GET /quizzes`, `GET /quizzes/:id`, quiz-question save logic, format-matching rules, total-question recalculation, total-marks recalculation, and publish checks that reject incomplete quizzes.
- `Student 3`: Implement `QuizQuestion` service logic, duplicate-question protection, marks mapping support, and the result data shape needed by dashboard and reports.
- `Output`: Quiz backend completed for draft and publish flows.

### Day 11 - Connect quizzes and build attempt flow

- `Student 1`: Connect the `Quizzes` page to real APIs and build the `Attempt` page with timer, question navigation, option selection, review markers, submit confirmation, and result-summary handoff after submission.
- `Student 2`: Implement `POST /attempts/start`, `POST /attempts/:id/answer`, `POST /attempts/:id/submit`, and `GET /attempts/:id`, return question data with options, and enforce attempt limits, time limit checks, randomization rules, answer locking after submission, and hidden extra info rules while attempts are active.
- `Student 3`: Build the attempt score calculation helpers, attempt-number logic, answer persistence helpers, and format-based field visibility logic.
- `Output`: Quizzes and attempt flow completed.

### Day 12 - Build results, review, and audit logging

- `Student 1`: Connect the `Results` page to live APIs and make score cards, correct or wrong or unanswered counts, and answer review views work.
- `Student 2`: Review and fix shared transaction handling, permission rules, and result-security issues, and implement `GET /results`, `GET /results/:attemptId`, pass or fail calculation, attempt history, answer review visibility rules, audit log creation, and leaderboard or top-scorer summary if the project wants that extra feature.
- `Student 3`: Create the result formatting helpers, attempt history query helpers, and answer review data mapping for each question.
- `Output`: Results, review, and audit modules completed.

### Day 13 - Build dashboard and reports

- `Student 1`: Connect the `Dashboard` and `Reports` pages to live APIs and add filters for date, subject, quiz, result status, and difficulty where needed.
- `Student 2`: Implement or finalize `/dashboard/summary` and reports for quiz counts, attempt counts, pass rate, average score, question-wise accuracy, difficult questions, and user performance, using Sequelize first and raw SQL only when truly needed.
- `Student 3`: Create the grouped Sequelize query helpers for subject, topic, question, quiz, attempt, and result report data.
- `Output`: Dashboard and reporting modules completed.

### Day 14 - Complete remaining integration work

- `Student 1`: Remove remaining mock data, connect every page to live APIs, and complete loading, empty, and error handling.
- `Student 2`: Complete token handling, middleware, route protection, validation, error handling, quiz formats, quizzes, attempts, results, dashboard totals, and report calculations.
- `Student 3`: Complete remaining content-module integration, question option rules, quiz mapping support, and realistic seed data across all modules.
- `Output`: Full project integration completed.

### Day 15 - Finalize runnable project setup

- `Student 1`: Make sure all frontend pages use the shared components, route guards, and live API data only.
- `Student 2`: Finalize environment setup, backend route exports, migration flow, seeder flow, and fresh database startup flow.
- `Student 3`: Finalize seed records for subjects, topics, questions, quiz formats, quizzes, attempts, and results so the full project data is available after setup.
- `Output`: Fully runnable 15-day project completed.

## 12. Things Students Must Keep In Mind

- Use Sequelize for database handling instead of writing scattered raw SQL in many files.
- Keep model names singular such as `User`, `Question`, and `QuizAttempt`.
- Keep naming style consistent across models, migrations, and database columns.
- Every schema change must be written through a migration.
- Do not depend on `sequelize.sync({ force: true })` for the main project workflow.
- Add associations carefully and check them early with sample data.
- Use `include` properly when fetching related data.
- Validate request data in validators and also in Sequelize model definitions where useful.
- Use transactions for multi-step database updates.
- Do not store plain-text passwords. Always hash them before saving.
- Do not expose `password_hash` in API responses.
- Keep `publish_status`, `result_status`, and `difficulty_level` values consistent everywhere.
- Every MCQ should follow the selected format's required option count.
- Standard single-answer MCQs should have exactly one correct option.
- Do not reveal hints, explanations, difficulty, or reference notes unless the selected quiz format allows it.
- Randomized option order should never break answer checking.
- Store marks and negative marks inside `QuizQuestion` so old results do not change when quiz settings change later.
- Save answer correctness and marks awarded in `AttemptAnswer` so review and reports stay accurate.
- Do not allow attempts after the quiz end time or after the maximum attempt count is reached.
- Keep `.env` values private and do not expose secrets.
- Implement both simple practice mode and strict exam mode correctly.
- Keep seed data realistic and complete across all modules.
- Coordinate daily so two students do not accidentally break the same files at the same time.

## 13. Final Expected Output

By the end of the project, the students should have:

- working Sequelize models
- working migrations
- working seeders
- correctly defined associations
- working backend APIs
- working React frontend
- full API integration
- role-based authentication
- configurable MCQ quiz format logic
- quiz creation and publishing logic
- attempt and result logic
- dashboard and reports
- complete sample seed data
- runnable project setup

## 14. Final Summary

Students should use these 15 days for practical coding work, not only theory.

The team should spend the project time on:

1. `setting up Sequelize and the SQL database`
2. `creating models, migrations, associations, and seeders`
3. `writing backend APIs`
4. `writing frontend pages`
5. `connecting frontend and backend`
6. `building configurable MCQ quiz flows`
7. `building results, dashboard, and report logic`
8. `completing realistic seed data`
9. `making the whole project run from fresh setup`

This is the structured 15-day Sequelize-based quiz coding plan the students should follow.