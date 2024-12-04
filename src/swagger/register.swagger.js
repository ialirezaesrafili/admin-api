/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register by providing email, password, username, role, and an avatar file. The avatar is uploaded to Cloudinary.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email address.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *       - in: formData
 *         name: username
 *         type: string
 *         required: true
 *         description: The user's username.
 *       - in: formData
 *         name: role
 *         type: string
 *         required: true
 *         description: The role of the user (e.g., 'admin', 'seller', 'customer').
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: true
 *         description: The user's profile picture.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Authentication token for the user.
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     role:
 *                       type: string
 *                       description: The user's role.
 *                       example: seller
 *       400:
 *         description: Invalid input or missing parameters.
 *       500:
 *         description: Internal server error.
 */

module.exports = {};
