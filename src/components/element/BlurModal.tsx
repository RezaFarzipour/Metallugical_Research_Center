"use client";

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import clsx from "clsx";
import { cn } from "@/utils/cn";

// تعریف نوع props
interface BlurModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactElement;
  bodyContent: string | ReactNode;
  onConfirm?: () => void;
  heightProp: "sm" | "md" | "lg" | "full";
  icon?: ReactNode;
  isPatching?: boolean;
  disabled?: boolean;
}

export default function BlurModal({
  isOpen,
  onClose,
  title,
  bodyContent,
  onConfirm,
  heightProp,
  isPatching,
  disabled,
}: BlurModalProps) {
  const heightClass = {
    sm: "h-64",
    md: "h-96",
    lg: "h-[600px]",
    full: "min-h-screen",
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent
          className={clsx("w-full max-w-4xl", heightClass[heightProp])}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody className="pt-12">
                {typeof bodyContent === "string" ? (
                  <p>{bodyContent}</p>
                ) : (
                  bodyContent
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button
                  type="submit"
                  className={cn(
                    "text-white px-4 py-2 ",
                    disabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-secondary-500 hover:bg-secondary-600"
                  )}
                  onPress={() => {
                    onConfirm?.();
                    onClose();
                  }}
                  disabled={disabled}
                >
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
