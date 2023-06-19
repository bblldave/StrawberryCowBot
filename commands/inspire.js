const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const { createCanvas } = require("canvas");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('inspire')
        .setDescription('Provides inspirational color palettes for your projects.')
        .addStringOption(option =>
            option.setName('keywords')
                .setDescription(`The keywords you would like to use to generate your color palettes.`)
        ),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const inspireChannel = interaction.member.guild.channels.cache.get(process.env.INSPIRE_CHANNEL);
        const keywords = interaction.options.getString('keywords');
        let keywordMessage = " ";
        if (keywords) {
            keywordMessage = ` To help you come up with ideas for each palette, please incorporate the keywords: ${keywords}. `;
        }
        try {
            const gptResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: `
                    Generate 3 beautiful color palettes for an amigurumi crochet project.${keywordMessage} 
                    Additionally, please include the hex codes for each color in 
                              the palettes and provide names for each palette. In order to organize this information, 
                              please format it as JSON data with arrays of palette objects. 
                              Each object should include a name and an array of color codes. 
                              The desired format for this data should be as follows: {
                                "palettes": [
                                    {
                                        "name": "Autumn Leaves",
                                        "colors": ["#CF9F42", "#A3845C", "#8B5A2B", "#912E13", "#602317"]
                                    },
                                    {
                                        "name": "Ocean Blues",
                                        "colors": ["#154360", "#1A5276", "#2980B9", "#6BB9F0", "#A9CCE3"]
                                    }
                                ]
                              }`
                }]
            });

            const colorPalettes = JSON.parse(gptResponse.data.choices[0].message.content).palettes;

            const files = [];
            for (const palette of colorPalettes) {
                const image = await createColorPaletteImage(palette.colors);
                const attachment = new AttachmentBuilder(image, { name: `${palette.name.replace(/\s/g, "-")}.jpeg` });
                files.push(attachment);
            }

            await inspireChannel
                .send({
                    content: 'Here are some color palettes to inspire your crochet project:',
                    files: files
                })
                .then((message) => {
                    const messageLink = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`
                    interaction.editReply({
                        content: `Your color palettes are available here: ${messageLink}`,
                        ephemeral: true
                    })
                })
                .catch(console.error);

        } catch (error) {
            console.log(error);
            await interaction.editReply('Sorry, something went wrong. Please try again later.');
        }
    }

}

async function createColorPaletteImage(hexColorArray) {
    const swatchWidth = 100;
    const swatchHeight = 20;

    const canvas = createCanvas(swatchWidth, hexColorArray.length * swatchHeight);
    const context = canvas.getContext('2d');

    for (let i = 0; i < hexColorArray.length; i++) {
        const color = hexColorArray[i];
        context.fillStyle = color;
        context.fillRect(0, i * swatchHeight, swatchWidth, swatchHeight);
    }

    return canvas.toBuffer('image/png');
}





