import { FILTER_ROUTES } from "../constants/Routes";

export const listTasks = async (filters) => {

  let res = await fetch("https://raw.githubusercontent.com/tarekwelaya/test-repo/main/tasks.json", {
  })
  .catch((error) => {
     console.error(error);
  })

  let resJson = await res.json()
  return resJson
};

export const getTask = async (id) => {
  
  let res = await fetch("https://raw.githubusercontent.com/tarekwelaya/test-repo/main/tasks.json", {
  })
  .catch((error) => {
     console.error(error);
  })

  let resJson = await res.json()

  let task = resJson.find(x => x.id == id)
  
  let result = await fetch(task.markdown)
  .catch(error => {
    let resText = error;
    throw resText;
  });

  let resText = await result.text();

  return [task, resText]
};

export const getSubmitFile = async () => {
  
  let res = await fetch("https://raw.githubusercontent.com/tarekwelaya/test-repo/main/submit.md", {
  })

  .catch((error) => {
     console.error(error);
  })

  let resText = await res.text()
  return resText

}
