package auth

type SignUp struct {
	Email           string `form:"email" json:"email" xml:"email" binding:"required"`
	Password        string `form:"password" json:"password" xml:"password" binding:"required"`
	ConfirmPassword string `form:"password_confirm" json:"password_confirm" xml:"password_confirm" binding:"required"`
}

type SignIn struct {
	Email    string `form:"email" json:"email" xml:"email" binding:"required"`
	Password string `form:"password" json:"password" xml:"password" binding:"required"`
}

type ChangePassword struct {
	OriginalPassword string `form:"origin_password" json:"origin_password" xml:"origin_password" binding:"required"`
	Password         string `form:"password" json:"password" xml:"password" binding:"required"`
	ConfirmPassword  string `form:"password_confirm" json:"password_confirm" xml:"password_confirm" binding:"required"`
}
