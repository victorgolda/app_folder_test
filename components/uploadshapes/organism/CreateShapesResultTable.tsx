'use client'
import React from 'react'
import _ from 'lodash'
import { Card, CardBody } from '@nextui-org/react'
import { CreateShapesElements } from '@/types/uploadShapes'
import { ResultTable } from '../molecules/ResultTable'

interface Props {
  createShapesResult: CreateShapesElements
}

export const CreateShapesResultTable = ({ createShapesResult }: Props) => {
  return (
    <div className='grid grid-cols-6'>
      {createShapesResult.newDevices.length > 0 && (
        <div className='col-span-6 grid grid-cols-1 gap-3'>
          <div className='col-span-1'>
            <h4 className='text-2xl font-medium text-gray-700 tracking-wide'>
              Nuevos dispositivos
            </h4>
          </div>

          <div className='col-span-1'>
            <Card>
              <CardBody>
                <ResultTable
                  items={createShapesResult.newDevices}
                  columns={[
                    { name: 'Nombre del dispositivo', uid: 'name' },
                    { name: 'Acciones', uid: 'actions' }
                  ]}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      )}
      {createShapesResult.newPolygons.length > 0 && (
        <div className='col-span-6 grid grid-cols-2 gap-3 mt-5'>
          <div className='col-span-2'>
            <h4 className='text-2xl font-medium text-gray-700 tracking-wide'>
              Nuevos polígonos
            </h4>
          </div>
          {createShapesResult.newPolygons.filter(
            (polygon) => polygon.type === 'coverage'
          ).length > 0 && (
            <div className='col-span-1'>
              <Card>
                <CardBody>
                  <h4 className='mb-2 ml-2 font-bold text-green-500 text-md'>
                    Coberturas
                  </h4>
                  <ResultTable
                    items={createShapesResult.newPolygons.filter(
                      (polygon) => polygon.type === 'coverage'
                    )}
                    columns={[
                      { name: 'Nombre de la cobertura', uid: 'name' },
                      { name: 'Tipo', uid: 'type' }
                    ]}
                  />
                </CardBody>
              </Card>
            </div>
          )}
          {createShapesResult.newPolygons.filter(
            (polygon) => polygon.type === 'blackhole'
          ).length > 0 && (
            <div className='col-span-1'>
              <Card>
                <CardBody>
                  <h4 className='mb-2 ml-2 font-bold text-red-500 text-md'>
                    Blackholes
                  </h4>
                  <ResultTable
                    items={createShapesResult.newPolygons.filter(
                      (polygon) => polygon.type === 'blackhole'
                    )}
                    columns={[
                      { name: 'Nombre de la cobertura', uid: 'name' },
                      { name: 'Tipo', uid: 'type' }
                    ]}
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
