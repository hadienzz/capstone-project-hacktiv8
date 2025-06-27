require('dotenv').config()

const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI(`${process.env.GEMINI_API_KEY}`)

const analyzeJournal = async (req, res) => {
    const { journal } = req.body

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                parts: [{
                    text: `Anda adalah AI analis psikolog profesional. 
  Berikan insight emosi, alasan, dan saran dengan ringkas, rinci, dan singkat dalam bentuk JSON tanpa tanda 3 kutip atau code block  agar bisa langsung diparse dalam bentuk json di front end. dengan format berikut:

  {
    "emosi": "",
    "alasan": "",
    "saran": ""
  }

  Berikut jurnal user:
  "${journal}"`

                }]
            }
        ]
    })
    const insight = response.candidates[0].content.parts[0].text
    return res.status(200).json(insight)
}

module.exports = analyzeJournal