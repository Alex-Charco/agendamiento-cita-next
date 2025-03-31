"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

export default function ReusableModal({ isOpen, onOpenChange, title, children }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-50 h-[70vh]">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
