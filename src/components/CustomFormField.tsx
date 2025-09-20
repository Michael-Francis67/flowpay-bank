"use client";

import React, {useState} from "react";
import {Control} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Camera} from "lucide-react";
import Image from "next/image";

type Field = {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "phone" | "select" | "date" | "file" | "number";
    placeholder?: string;
    options?: string[];
    min?: number;
};

interface FormFieldRendererProps {
    field: Field;
    control: Control<any>;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({field, control}) => {
    const [preview, setPreview] = useState<string | null>(null);

    switch (field.type) {
        case "text":
        case "email":
        case "password":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                                <Input type={field.type} placeholder={field.placeholder} {...rhfField} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "number":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                                <Input
                                    type={field.type}
                                    min={field.min}
                                    placeholder={field.placeholder}
                                    {...rhfField}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "phone":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    country="ng"
                                    value={rhfField.value}
                                    onChange={(val) => rhfField.onChange(val)}
                                    inputStyle={{width: "100%"}}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "select":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                                <Select onValueChange={rhfField.onChange} value={rhfField.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "date":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem className="flex flex-col gap-1 w-full">
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={rhfField.value}
                                    onChange={(date) => rhfField.onChange(date)}
                                    placeholderText={field.placeholder}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full border rounded-md p-2"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case "file":
            return (
                <FormField
                    control={control}
                    name={field.name as any}
                    render={({field: rhfField}) => (
                        <FormItem className="flex flex-col items-center space-y-2">
                            <FormControl>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="avatar-upload"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setPreview(url);
                                                rhfField.onChange(file);
                                            }
                                        }}
                                    />
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="preview"
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-500">No Image</span>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer"
                                    >
                                        <Camera className="w-5 h-5 text-gray-600" />
                                    </label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        default:
            return null;
    }
};
