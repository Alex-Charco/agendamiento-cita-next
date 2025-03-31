"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function CustomTabs({ tabs }) {
    return (
        <div className="flex w-full flex-col m-2 border-1 border-gray-300 rounded">
            <Tabs className="mx-2 mt-2">
                {tabs.map((tab) => (
                    <Tab key={tab.key} title={tab.title}>
                        <Card className="mx-2">
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
