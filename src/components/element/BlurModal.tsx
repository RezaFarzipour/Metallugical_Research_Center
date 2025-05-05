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
import clsx from "clsx";

// تعریف نوع props
interface BlurModalProps {
  title: string | element;
  bodyContent: string | ReactNode;
  onConfirm?: () => void;
  heightProp: "sm" | "md" | "lg" | "full";
}

export default function BlurModal({
  title,
  bodyContent,
  onConfirm,
  heightProp,
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
      <Button color="primary" onPress={onOpen}>
        {title}
      </Button>

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
                  color="primary"
                  onPress={() => {
                    onConfirm?.();
                    onClose();
                  }}
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
