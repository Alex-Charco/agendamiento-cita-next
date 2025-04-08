"use client";

import PropTypes from "prop-types";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";

function CustomTabs({ tabs }) {
    return (
        <div className="bg-white w-full max-w-[99%] m-2 p-2 overflow-x-hidden border border-gray-300">
            <Tabs className="w-full bg-gray-50 border border-gray-200 rounded-2xl" onChange={(tabKey) => setActiveTab(tabKey)}>
				{tabs.map((tab) => (
					<Tab className="text-xs" key={tab.key} title={tab.title}>
						<Card className="w-full">
							<CardBody>{tab.content}</CardBody>
						</Card>
					</Tab>
				))}
			</Tabs>
        </div>
    );
}

CustomTabs.propTypes = {
	Tabs: PropTypes.object,
	Tab: PropTypes.object,
	Card: PropTypes.object,
	CardBody: PropTypes.object,
}

export default CustomTabs;