import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentCreatePrisma from "../../utils/db/comment/commentCreatePrisma";
import commentViewer from "../../view/commentViewer";

export default async function createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { body: body } = req.body.comment;
    console.log(body);
    try {
      // Get currentUser
      //const currentUser = await userGetPrisma(username);
      //if (!currentUser) return res.sendStatus(401);
  
      // Add comment to database
      const comment = await commentCreatePrisma(
        body
      );
  
      // Create comment view
      const commentView = commentViewer(comment);
      return res.status(201).json({ comment: commentView });
    } catch (error) {
      return next(error);
    }
  }