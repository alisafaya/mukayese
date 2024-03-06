import { LLM_TASKS_PATH, TASKS_PATH, TASKS_DETAILS_PATH, SUBMIT_PATH } from "../constants/Routes";

export const listTasks = async (type) => {

  let path = type === "llm" ? LLM_TASKS_PATH : TASKS_PATH
  let res = await fetch(path, {
  })
    .catch((error) => {
      console.error(error);
    })

  let resJson = await res.json()
  return resJson
};

export const getTask = async (id) => {

  // fetch tasks
  let res = await fetch(TASKS_PATH, {
  })
    .catch((error) => {
      console.error(error);
    })

  let resJson = await res.json()

  // fetch llm tasks
  let resLlm = await fetch(LLM_TASKS_PATH, {
  })
    .catch((error) => {
      console.error(error);
    })

  let resJsonLlm = await resLlm.json()

  resJson = resJson.concat(resJsonLlm)

  let task = resJson.find(x => x.id === id)

  let result = await fetch(
    TASKS_DETAILS_PATH + task.file)
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
