
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import SecretKey from '../models/SecretKey';

export const createSecretKey = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const key = req.body.key;
    if (!userId || !key) return res.status(400).json({ message: 'User ID and key are required.' });
    // Validate key format: AxA###BxB
    const keyFormat = /^AxA\d{3}BxB$/;
    if (!keyFormat.test(key)) {
      return res.status(400).json({ message: 'Key must be in format AxA###BxB, where ### is any 3 digits.' });
    }
    // Ensure unique key for user
    const exists = await SecretKey.findOne({ user: new Types.ObjectId(userId), key });
    if (exists) {
      return res.status(409).json({ message: 'Key already exists for this user.' });
    }
    const secretKey = new SecretKey({ user: userId, key });
    await secretKey.save();
    res.status(201).json({ key });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
