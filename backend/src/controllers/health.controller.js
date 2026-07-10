import mongoose from 'mongoose';

export const getHealth = (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  res.status(200).json({
    success: true,
    message: 'Blooming Happiness API is healthy',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
    database: {
      status: dbStates[mongoose.connection.readyState],
      host: mongoose.connection.host || null,
    },
  });
};
