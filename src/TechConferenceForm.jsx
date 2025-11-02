import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./TechConferenceForm.css";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const validatePassword = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*]/.test(value);
    return (value.length >= 8 && hasNumber && hasSymbol) || "Password harus 8+ karakter, mengandung angka & simbol";
  };

  const onSubmit = (data) => {
    console.log(data);
    setSubmittedName(data.fullName);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div className="form-container">
      <h2>Form Registrasi Tech Conference</h2>
      {isSubmitted && <p className="success-message">Registrasi Berhasil, {submittedName}!</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input type="text" {...register("fullName", { required: "Nama lengkap wajib diisi" })} />
          {errors.fullName && <p className="error">{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            {...register("username", {
              required: "Username wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
              maxLength: { value: 20, message: "Maksimal 20 karakter" },
            })}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email tidak valid",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password wajib diisi",
              validate: validatePassword,
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label>Umur:</label>
          <input
            type="number"
            {...register("age", {
              required: true,
              min: { value: 18, message: "Minimal 18 tahun" },
              max: { value: 100, message: "Maksimal 100 tahun" },
            })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        <div className="form-group">
          <label>Tipe Tiket:</label>
          <select
            {...register("ticketType", {
              required: "Pilih tipe tiket",
            })}
          >
            <option value="">-- Pilih Tipe Tiket --</option>
            <option value="General Access">General Access</option>
            <option value="VIP">VIP</option>
            <option value="Student">Student</option>
          </select>
          {errors.ticketType && <p className="error">{errors.ticketType.message}</p>}
        </div>

        <div className="form-group">
          <label>Situs Web Pribadi (opsional):</label>
          <input
            type="url"
            {...register("websiteUrl", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Format URL tidak valid",
              },
            })}
          />
          {errors.websiteUrl && <p className="error">{errors.websiteUrl.message}</p>}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "Anda harus menyetujui syarat & ketentuan",
              })}
            />
            Saya setuju dengan syarat & ketentuan
          </label>
          {errors.agreeToTerms && <p className="error">{errors.agreeToTerms.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Kirim
        </button>
      </form>
    </div>
  );
}
