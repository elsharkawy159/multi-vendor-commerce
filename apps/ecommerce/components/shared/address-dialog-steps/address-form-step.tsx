"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

// Import our reusable inputs
import { TextInput } from "@workspace/ui/components/inputs/text-input";
import { TextareaInput } from "@workspace/ui/components/inputs/textarea-input";
import { SwitchInput } from "@workspace/ui/components/inputs/switch-input";

import {
  addressSchema,
  addressDefaults,
  type AddressData,
} from "../../address/address.schema";
import { useAddress } from "@/providers/address-provider";

interface AddressFormStepProps {
  address?: AddressData | null;
  selectedLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  } | null;
  onSuccess?: (address: AddressData) => void;
  onCancel?: () => void;
}

export const AddressFormStep = ({
  address,
  selectedLocation,
  onSuccess,
  onCancel,
}: AddressFormStepProps) => {
  const [isPending, startTransition] = useTransition();

  // Use the AddressProvider
  const { addAddress, updateAddress } = useAddress();

  // Setup form with react-hook-form
  const form = useForm<AddressData>({
    resolver: zodResolver(addressSchema) as any,
    defaultValues: {
      ...addressDefaults,
      ...address,
      // Pre-fill with selected location data
      ...(selectedLocation && {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        addressLine1: selectedLocation.address || address?.addressLine1 || "",
        city: selectedLocation.city || address?.city || "",
        state: selectedLocation.state || address?.state || "",
        country: selectedLocation.country || address?.country || "Egypt",
        postalCode: selectedLocation.postalCode || address?.postalCode || "",
      }),
    },
  });

  // Handle form submission with useTransition
  const handleSubmit = (data: AddressData) => {
    startTransition(async () => {
      try {
        const isEditing = !!data.id;
        const result = isEditing
          ? await updateAddress(data.id!, data)
          : await addAddress(data);

        if (result.success) {
          form.reset();
          onSuccess?.(result.data as AddressData);
        } else {
          // Provider already shows toast, but handle field errors if any
          // Set server-side field errors if available
          if (result && typeof result === "object" && "error" in result) {
            const error = (result as any).error;
            if (error && typeof error === "object") {
              Object.entries(error).forEach(([field, messages]) => {
                form.setError(field as keyof AddressData, {
                  type: "server",
                  message: Array.isArray(messages)
                    ? (messages[0] as string)
                    : String(messages),
                });
              });
            }
          }
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    });
  };

  return (
    <Card className="pb-0 pt-5">
      {/* <CardHeader></CardHeader> */}

      <CardContent className="px-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit as any)}
            className="space-y-4"
          >
            {/* Personal Information */}
            <div className="space-y-3 px-6">
              <h3 className="font-semibold text-sm">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  form={form as any}
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                />

                <TextInput
                  form={form as any}
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-3 px-6">
              <h3 className="font-semibold text-sm">Address Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  form={form as any}
                  name="addressLine1"
                  label="Address Line 1"
                  placeholder="Street address, building name, etc."
                  required
                />

                <TextInput
                  form={form as any}
                  name="addressLine2"
                  label="Building / Floor (Optional)"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TextInput
                  form={form as any}
                  name="city"
                  label="City"
                  placeholder="Enter city"
                  required
                />

                <TextInput
                  form={form as any}
                  name="state"
                  label="State/Province"
                  placeholder="Enter state or province"
                  required
                />

                <TextInput
                  form={form as any}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter postal code"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Business Address Toggle */}
            <div className="space-y-3 px-6">
              <SwitchInput
                name="isBusinessAddress"
                label="This is a business address"
                labelPosition="right"
                className="space-y-0"
              />

              {form.watch("isBusinessAddress") && (
                <TextInput
                  form={form as any}
                  name="company"
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                />
              )}
            </div>

            <Separator />

            {/* Delivery Instructions */}
            <div className="space-y-3 px-6">
              <TextareaInput
                form={form as any}
                name="deliveryInstructions"
                label="Special Instructions (Optional)"
                placeholder="Gate codes, building access, special delivery instructions, etc."
                showCharacterCount={true}
              />
            </div>

            {/* Form Actions */}
            <div className="px-6 py-3 border-t bg-white">
              <div className="gap-3 flex">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isPending}
                    className="flex-1 rounded"
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 rounded"
                >
                  {isPending
                    ? address?.id
                      ? "Updating Address..."
                      : "Creating Address..."
                    : address?.id
                      ? "Update Address"
                      : "Save Address"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
