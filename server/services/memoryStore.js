const memory = [];

export const addMessage = (role, content) => {
  memory.push({ role, content });
};

export const getMemory = () => {
  return memory.slice(-5);
};

export const clearMemory = () => {
  memory.length = 0;
};