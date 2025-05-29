const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Não use app.use(express.static('public')) aqui, pois o frontend será servido diretamente pelo Vercel

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'atendimentosac14@gmail.com',
        pass: 'fzkm seps gcmo bqeh'
    }
});

app.post('/enviar-email', async (req, res) => {
    const { sugestoes, reclamacoes, elogios, melhorias, nota, satisfacao, date } = req.body;
    const corpo = `
Sugestões: ${sugestoes || '-'}
Reclamações: ${reclamacoes || '-'}
Elogios: ${elogios || '-'}
Melhorias: ${melhorias || '-'}
Nota: ${nota || '-'}
Satisfação: ${satisfacao || '-'}
Ideias para o próximo date: ${date || '-'}
    `;
    try {
        await transporter.sendMail({
            from: 'atendimentosac14@gmail.com',
            to: 'owayran1998@gmail.com',
            subject: 'Novo feedback recebido pelo site',
            text: corpo
        });
        res.json({ message: 'Feedback enviado com sucesso! Obrigado.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar o feedback.' });
    }
});

// Exporta o app para a Vercel
module.exports = app;
