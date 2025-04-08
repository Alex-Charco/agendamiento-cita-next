"use client";

import PropTypes from "prop-types";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

function ReusableModal({ isOpen, onOpenChange, title, children }) {
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

ReusableModal.propTypes = {
    isOpen: PropTypes.object,
    onOpenChange: PropTypes.object,
    title: PropTypes.object,
    children: PropTypes.object,
}

export default ReusableModal;