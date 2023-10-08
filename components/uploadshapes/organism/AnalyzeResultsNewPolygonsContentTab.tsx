'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  /*   Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell, */
  Card,
  CardBody
  /*   CardHeader,
  CardFooter */
} from '@nextui-org/react'
import _ from 'lodash'
import MapPreviewModal from '../molecules/MapPreviewModal'
import { MapIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'
import { PolygonMap } from '@/types/map'
import useUploadShapes from '@/hooks/uploadshapes/useUploadShapes'

interface Props {}

/* const columns = [
  { name: 'Nombre de la cobertura', uid: 'name' }
  //{ name: 'Acciones', uid: 'actions' }
] */

export const AnalyzeResultsNewPolygonsContentTab = ({}: Props) => {
  const { newPolygons, analyzeShapesResult } = useUploadShapes()
  const [openMapPreview, setOpenMapPreview] = useState<boolean>(false)
  const [previewPolygons, setPreviewPolygons] = useState<PolygonMap[]>([])

  useEffect(() => {
    let newMapPolygons = [] as PolygonMap[]
    newPolygons.forEach((polygon) => {
      if (polygon.newPolygonData.geoLocation !== undefined) {
        newMapPolygons.push({
          id: polygon?.id,
          name: polygon.newPolygonData.name,
          geoLocation: polygon.newPolygonData.geoLocation,
          type: polygon.newPolygonData.type
        })
      }
    })
    if (newMapPolygons.length > 0) {
      setPreviewPolygons(newMapPolygons)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MapPreviewModal
        open={openMapPreview}
        setOpen={setOpenMapPreview}
        newPolygons={previewPolygons}
      />
      {!_.isEmpty(newPolygons) && (
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-start-5 col-span-1 '>
            <Button
              //color={'primary'}
              className='bg-cyan-500 text-white font-bold text-1xl px-4 py-2 rounded-lg w-full inline-flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
              onClick={() => setOpenMapPreview(true)}
              endContent={<MapIcon />}
            >
              Previsualizar elementos
            </Button>
          </div>
          <div className='col-span-5 grid grid-cols-4 gap-2'>
            {analyzeShapesResult.newCoveragePolygonsCount &&
              analyzeShapesResult.oldCoveragePolygonsCount && (
                <div className='col-span-2'>
                  <Card>
                    <CardBody>
                      <div className='grid grid-cols-3 gap-1 self-center'>
                        <div className='col-span-3'>
                          <h4 className='text-4xl font-medium text-center m-1 text-green-500'>
                            Coberturas
                          </h4>
                        </div>
                        <div className='col-span-1'>
                          <p className='text-8xl text-center'>
                            {analyzeShapesResult.oldCoveragePolygonsCount}
                          </p>
                        </div>
                        <div className='col-span-1'>
                          <ArrowLongRightIcon className=' fill-green-500' />
                        </div>
                        <div className='col-span-1'>
                          <p className='text-8xl text-center'>
                            {analyzeShapesResult.newCoveragePolygonsCount}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}

            {analyzeShapesResult.newBlackholePolygonsCount &&
              analyzeShapesResult.oldBlackholePolygonsCount && (
                <div className='col-span-2'>
                  <Card>
                    <CardBody>
                      <div className='grid grid-cols-3 gap-1 self-center'>
                        <div className='col-span-3'>
                          <h4 className='text-4xl font-medium text-center m-1 text-red-500'>
                            Blackholes
                          </h4>
                        </div>
                        <div className='col-span-1'>
                          <p className='text-8xl text-center'>
                            {analyzeShapesResult.oldBlackholePolygonsCount}
                          </p>
                        </div>
                        <div className='col-span-1'>
                          <ArrowLongRightIcon className=' fill-green-500' />
                        </div>
                        <div className='col-span-1'>
                          <p className='text-8xl text-center'>
                            {analyzeShapesResult.newBlackholePolygonsCount}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}
          </div>

          {/*           <div className='col-span-5 grid grid-cols-8 gap-2'>
            {newPolygons.map((newPolygon: NewPolygon) => {
              return (
                <div className='col-span-2' key={newPolygon.id}>
                  <Card>
                    <CardBody>
                      <div className='grid grid-cols-4 gap-1'>
                        <div className='col-start-2 col-span-2 '>
                          <h4 className='text-lg font-medium text-center m-1 text-blue-600'>
                            {newPolygon.newPolygonData.name}
                          </h4>
                        </div>
                        <div className='col-span-1 align-middle place-content-end flex m-1'>
                          <CheckCircleIcon className=' fill-green-500 w-8' />
                        </div>

                        <div className='col-span-4 grid grid-cols-6'>
                          <div className='col-start-2 col-span-4'>
                            <h4 className='text-lg font-medium text-center m-1 text-gray-400'>
                              {newPolygon.newPolygonData.type === 'coverage'
                                ? 'Cobertura'
                                : 'Black Hole'}
                            </h4>
                          </div>
                          <div className='col-span-1 self-center justify-center'>
                            <PiPolygonBold
                              className={`h-6 w-5  ${
                                newPolygon.newPolygonData.type === 'coverage'
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }  `}
                            />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )
            })}
          </div> */}

          {/*               <Table>
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === 'actions' ? 'center' : 'start'}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={newPolygons}>
                  {(item: NewPolygon) => {
                    return (
                      <TableRow key={item.newPolygonData.name}>
                        <TableCell>{item.newPolygonData.name}</TableCell>
                      </TableRow>
                    )
                  }}
                </TableBody>
              </Table> */}
        </div>
      )}
    </>
  )
}
