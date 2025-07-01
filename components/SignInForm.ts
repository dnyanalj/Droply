"use client";

import { signInSchema } from "@/schemas/signInSchema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

export default function SignInForm() {
     const router = useRouter();
     const { signIn, isLoaded, setActive } = useSignIn();
      const [isSubmitting, setIsSubmitting] = useState(false);
 const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);


   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  
}   