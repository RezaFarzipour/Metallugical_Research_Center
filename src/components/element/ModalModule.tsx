"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

type ModalModuleProps = {
  title: string;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

const ModalModule: React.FC<ModalModuleProps> = ({
  title,
  confirmText = "تایید",
  cancelText = "انصراف",
  isOpen,
  onCancel,
  onConfirm,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onCancel}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onCancel}>
                {cancelText}
              </Button>
              <Button className="bg-red-500 text-white" onPress={onConfirm}>
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalModule;
