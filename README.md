## Getting Started

1. Change directory into the desired folder
2. Clone the repository in the desired folder
3. Run `cd repo-name`
4. Run `pnpm i`
5. Update `DATABASE_URL` in `.env` file
6. Run `pnpm dev`

## Assumptions

1. You have access to the `DATABASE_URL`
2. You have `pnpm` installed
3. You have Node.js installed
4. You have Git installed
5. You have access to the repository URL (for cloning)

## Folder Stucture

1. This project uses Next.js with App Router
2. Routes are defined by the folder structure in the `app/` directory
3. Uses layout to style the pages

## Data Fetching Approaches

1. Uses server side data fetching in `app/api` directory
2. This is used to fetch data for the feedback list
3. Uses client side data fetching in `app/recipes/_components` directory, using TanStack Query
4. This is used to fetch data for the recipe list
