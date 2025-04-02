"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function CustomTabs({ tabs }) {
    return (
        <div className="bg-white w-full max-w-[99%] m-2 p-2 overflow-x-hidden border border-gray-300 rounded">
            <Tabs className="w-full" onChange={(tabKey) => setActiveTab(tabKey)}>
				{tabs.map((tab) => (
					<Tab key={tab.key} title={tab.title}>
						<Card className="w-full rounded">
							<CardBody>{tab.content}</CardBody>
						</Card>
					</Tab>
				))}
			</Tabs>
        </div>
    );
}
