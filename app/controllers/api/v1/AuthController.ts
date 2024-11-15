import { Request, Response } from "express";
import { UserService } from "../../../services/UserService";
import { UserType } from "../../../models/UserModel";
import { uploadToCloudinary } from "../../../utils/uploadCloudinary";

const userService = new UserService();

export class AuthController {
    public static async register(req: Request, res: Response): Promise<Response> {
        try {
            const { username, email, password, dob, gender }: UserType = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Please provide a valid input"
                })
            }

            const userEmail = await userService.findUserByEmail(email);

            if (userEmail) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Email already exists"
                })
            }

            let avatarUrl;
            if (req.file) {
                const image = await uploadToCloudinary(req.file?.buffer, req.file?.mimetype, 'choco/avatar');

                avatarUrl = image.secure_url;
            }

            const user = await userService.registerUser({
                username,
                email,
                password,
                dob: dob,
                gender: gender,
                avatar: avatarUrl,
            });

            return res.status(201).json({
                status: "Success",
                message: "User successfully registered",
                data: user
            });
        } catch (error) {
            console.error("Internal Server Error:", error);
            return res.status(500).json({
                status: "Failed",
                message: 'Internal Server Error',
                error: error
            });
        }
    }

    public static async login(req: Request, res: Response): Promise<Response> {
        console.log(req.body);
        
        try {
            const { email, password } = req.body;

            const user = await userService.findUserByEmail(email);

            if (!user) {
                return res.status(404).json({
                    status: "Failed",
                    message: "Email not found"
                });
            }


            const isPasswordCorrect = await userService.verifyPassword(user.password as string, password);

            if (!isPasswordCorrect) {
                return res.status(401).json({ status: "Failed", message: "Wrong password" });
            }

            const token = await userService.generateToken(user);

            return res.status(200).json({
                status: "Success",
                message: "Login successful",
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            })
        } catch (error) {
            return res.status(500).json({ status: "Failed", message: "Internal server error" })
        }
    }

    public static async getCurrentUser(req: Request, res: Response): Promise<Response> {
        try {
            // Assume that the token is passed in the Authorization header
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({
                    status: "Failed",
                    message: "No token provided"
                });
            }

            // Extract the token from the header
            const token = authHeader.split(' ')[1];

            // Verify and decode the token
            const decodedUser = await userService.verifyToken(token);

            if (!decodedUser) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid or expired token"
                });
            }

            // Find the user based on the ID from the decoded token
            const user = await userService.findUserById(decodedUser.id);

            if (!user) {
                return res.status(404).json({
                    status: "Failed",
                    message: "User not found"
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "User data retrieved successfully",
                data: user
            });
        } catch (error) {
            console.error("Internal Error", error);
            return res.status(500).json({
                status: "Failed",
                message: "Internal server error"
            });
        }
    }
}