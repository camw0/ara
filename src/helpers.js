const clean = (msg) => { setTimeout(() => msg.delete(), 5000) };

const setError = async (message, error) => {
    await message.reactions.removeAll();
    await message.react('❌');
    if (error) message.reply(error);
};

const setSuccess = async (message, success) => {
    await message.reactions.removeAll();
    if (success) message.reply(success).then(m => clean(m));
};

const setLoading = (message) => {
    message.react('1003456285607460914');
};

module.exports = { clean, setError, setSuccess, setLoading };
