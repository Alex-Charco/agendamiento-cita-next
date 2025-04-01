"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function CustomTabs({ tabs }) {
    return (
        <div className="bg-white w-full max-w-[95%] m-4 p-2  overflow-x-hidden border border-gray-300 rounded">
            <Tabs className="w-full">
                {tabs.map((tab) => (
                    <Tab key={tab.key} title={tab.title}>
                        <Card className="w-full rounded">
                            <CardBody>
                                {tab.content}
                            </CardBody>
                        </Card>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}
