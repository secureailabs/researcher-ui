## To start the web app:

1. Install yarn if you don't have it already: `npm install --global yarn`
2. Install the dependencies: `yarn`
3. Start the web app: `yarn start`

## Guidelines to follow:

1. If you may any component, try to use the base template located in `src/components/templates/base.
2. The above has 3 files - `index.tsx`, `BaseTemplate.tsx` and `BaseTemplate.module.css`.
3. You may copy the files wherever you require and rename the BaseTemplate to something else, but make sure to rename the file names as well.
4. Any local component (which shall never be probably used outside the file) should reside inside the same directory as main component but inside a folder named `components`.

## To add a new page:

1. Create a new folder inside `src/pages` with the name of the page.
2. Copy the base template files from `src/components/templates/base` to the new folder.
3. Rename the files to the name of the page.
4. Rename the `BaseTemplate` class to the name of the page.

## To add a new item in left side bar:

1. Update the 'src/menu-items' file with the new item.

## Please try to follow the commit-lint message format (refer to commitlint.config.js)

# Deploy using docker

make push_image
