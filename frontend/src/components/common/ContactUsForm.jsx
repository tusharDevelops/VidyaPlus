import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json';
import { contactusEndpoint } from '../../services/apis';
import { apiConnector } from '../../services/apiConnector';
import toast from 'react-hot-toast';

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    const toastid = toast.loading("Sending your message...");
    try {
      setLoading(true);
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
      toast.dismiss(toastid);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.dismiss(toastid);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(submitContactForm)}>
      {/* Name Fields */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label className="text-[14px] font-semibold text-ink px-1" htmlFor="firstname">First Name</label>
          <input
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="w-full bg-surface border border-hairline focus:border-ink transition-all py-3 px-6 rounded-full text-[14px]"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="mt-1 text-[12px] text-brand-coral px-1">First name is required.</span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label className="text-[14px] font-semibold text-ink px-1" htmlFor="lastname">Last Name</label>
          <input
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="w-full bg-surface border border-hairline focus:border-ink transition-all py-3 px-6 rounded-full text-[14px]"
            {...register("lastname", { required: true })}
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] font-semibold text-ink px-1">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          className="w-full bg-surface border border-hairline focus:border-ink transition-all py-3 px-6 rounded-full text-[14px]"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="mt-1 text-[12px] text-brand-coral px-1">Email address is required.</span>
        )}
      </div>

      {/* Phone Number Field */}
      <div className="flex flex-col gap-2">
        <label className="text-[14px] font-semibold text-ink px-1" htmlFor="phonenumber">Phone Number</label>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-1/3">
            <select
              name="countrycode"
              id="countrycode"
              className="w-full bg-surface border border-hairline focus:border-ink transition-all py-3 px-4 rounded-full text-[14px] appearance-none cursor-pointer"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code} className="bg-canvas">
                    {ele.code}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              placeholder="1234567890"
              className="w-full bg-surface border border-hairline focus:border-ink transition-all py-3 px-6 rounded-full text-[14px]"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Phone number is required",
                },
                maxLength: { value: 12, message: "Invalid number" },
                minLength: { value: 10, message: "Invalid number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="mt-1 text-[12px] text-brand-coral px-1">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[14px] font-semibold text-ink px-1">Message</label>
        <textarea
          name="message"
          id="message"
          placeholder="How can we help you?"
          className="w-full bg-surface border border-hairline focus:border-ink transition-all py-4 px-6 rounded-[24px] text-[14px] min-h-[150px]"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="mt-1 text-[12px] text-brand-coral px-1">Message is required.</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="w-full mt-4 bg-ink text-canvas font-semibold py-4 rounded-full transition-all hover:opacity-90 active:scale-95 text-[14px]"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
