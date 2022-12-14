import React from 'react'
import {KTCard, KTCardBody} from '../../_metronic/helpers'
import {TabView, TabPanel} from 'primereact/tabview'

export default function CustomTab({tabbar, tabs}: any) {
  return (
    <KTCard>
      <KTCardBody>
        <TabView>
            {tabbar.map((v:any, i:number) => <TabPanel header={v}>{tabs[i]}</TabPanel>)}
        </TabView>
      </KTCardBody>
    </KTCard>
  )
}
