export function handleMessageNotify(data) {
    const { message, nickname } = data;
    console.log(`${nickname}: ${message}`);
  }