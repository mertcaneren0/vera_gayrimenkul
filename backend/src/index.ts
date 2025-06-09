import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { careerApplicationsRouter } from './routes/career-applications';
import { teamMembersRouter } from './routes/team-members';
import { listingApplicationsRouter } from './routes/listing-applications';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/career-applications', careerApplicationsRouter);
app.use('/api/team-members', teamMembersRouter);
app.use('/api/listing-applications', listingApplicationsRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir şeyler yanlış gitti!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 