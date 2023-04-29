import { TASKS_PATH, SUBMIT_PATH } from "../constants/Routes";

export const listTasks = async () => {

  let res = await fetch(TASKS_PATH, {
  })
    .catch((error) => {
      console.error(error);
    })

  let resJson = await res.json()
  return resJson
};

export const getTask = async (id) => {

  let res = await fetch(TASKS_PATH, {
  })
    .catch((error) => {
      console.error(error);
    })

  let resJson = await res.json()

  let task = resJson.find(x => x.id === id)

  let result = await fetch(task.markdown)
    .catch(error => {
      let resText = error;
      throw resText;
    });

  let resText = await result.text();

  return [task, resText]
};

export const getSubmitFile = async () => {

  let res = await fetch(SUBMIT_PATH, {
  })

    .catch((error) => {
      console.error(error);
    })

  let resText = await res.text()
  return resText

}
