"use client";

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { cn } from "@/utils/cn";
import { EditorItem } from "@/types";

interface BlurModalProps {
  title: string | element;
  bodyContent: string | ReactNode;
  onConfirm?: () => void;
  heightProp: "sm" | "md" | "lg" | "full";
  icon?: ReactNode;
  disabled?: boolean;
  setEditingItem?: (item: EditorItem) => void;
  setEditingHtml?: (html: string) => void;
  item?: EditorItem;
  size?: "sm" | "md" | "lg";
}

export default function BlurModal({
  title,
  icon,
  bodyContent,
  onConfirm,
  heightProp,
  disabled,
  setEditingItem,
  setEditingHtml,
  item,
  size = "md",
}: BlurModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const heightClass = {
    sm: "h-64",
    md: "h-96",
    lg: "h-[600px]",
    full: "min-h-screen",
  };

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          if (item) {
            setEditingItem?.(item);
            setEditingHtml?.(item.content);
          }
        }}
        className="bg-green-600  text-white"
        endContent={icon}
        size={size}
      >
        {title}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent
          className={cn("w-full max-w-4xl", heightClass[heightProp])}
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
