
import { Inputs } from "@bitbybit-dev/occt";
import { OCCTWorkerManager } from "../../../occ-worker/occ-worker-manager";

export class OCCTEdge {

    constructor(
        private readonly occWorkerManager: OCCTWorkerManager,
    ) {
    }

   /**
     * Creates linear edge from base line format {start: Point3, end: Point3}
     * @param inputs base line
     * @returns OpenCascade edge
     * @group from base
     * @shortname edge from base line
     * @drawable true
     */
    fromBaseLine(inputs: Inputs.OCCT.LineBaseDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseLine", inputs);
    }

    /**
     * Creates linear edges from base lines format {start: Point3, end: Point3}[]
     * @param inputs base lines
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from base lines
     * @drawable true
     */
    fromBaseLines(inputs: Inputs.OCCT.LineBaseDto): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseLines", inputs);
    }

    /**
     * Creates linear edge from base segment format [Point3, Point3]
     * @param inputs base segment
     * @returns OpenCascade edge
     * @group from base
     * @shortname edge from base segment
     * @drawable true
     */
    fromBaseSegment(inputs: Inputs.OCCT.SegmentBaseDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseSegment", inputs);
    }
  
    /**
     * Creates linear edge from base segments format [Point3, Point3][]
     * @param inputs base segments
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from base segments
     * @drawable true
     */
    fromBaseSegments(inputs: Inputs.OCCT.SegmentsBaseDto): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseSegments", inputs);
    }

    /**
     * Creates linear edges from collection of points
     * @param inputs Points
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from points
     * @drawable true
     */
    fromPoints(inputs: Inputs.OCCT.PointsDto) : Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromPoints", inputs);
    }

    /**
     * Creates linear edges from polyline definition
     * @param inputs Polyline
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from polyline
     * @drawable true
     */
    fromBasePolyline(inputs: Inputs.OCCT.PolylineBaseDto) : Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBasePolyline", inputs);
    }

    /**
     * Creates linear edges from triangle definition
     * @param inputs Triangle
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from triangle
     * @drawable true
     */
    fromBaseTriangle(inputs: Inputs.OCCT.TriangleBaseDto) : Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseTriangle", inputs);
    }

    /**
     * Creates linear edges from mesh definition
     * @param inputs Mesh
     * @returns OpenCascade edges
     * @group from base
     * @shortname edges from mesh
     * @drawable true
     */
    fromBaseMesh(inputs: Inputs.OCCT.MeshBaseDto) : Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.fromBaseMesh", inputs);
    }

    /**
     * Creates linear edge between two points
     * @param inputs Two points between which edge should be created
     * @returns OpenCascade edge
     * @group primitives
     * @shortname line
     * @drawable true
     */
    line(inputs: Inputs.OCCT.LineDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.line", inputs);
    }

    /**
     * Creates arc edge between three points
     * @param inputs three points
     * @returns OpenCascade edge
     * @group primitives
     * @shortname arc 3 points
     * @drawable true
     */
    arcThroughThreePoints(inputs: Inputs.OCCT.ArcEdgeThreePointsDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.arcThroughThreePoints", inputs);
    }

    /**
     * Creates arc edge between two points given the tangent direction vector on first point.
     * @param inputs two points and tangent vector
     * @returns OpenCascade edge
     * @group primitives
     * @shortname arc 2 points tangent
     * @drawable true
     */
    arcThroughTwoPointsAndTangent(inputs: Inputs.OCCT.ArcEdgeTwoPointsTangentDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.arcThroughTwoPointsAndTangent", inputs);
    }

    /**
     * Creates an arc edge between two points on a circle
     * @param inputs two points and circle edge
     * @returns OpenCascade edge
     * @group primitives
     * @shortname arc from circle and points
     * @drawable true
     */
    arcFromCircleAndTwoPoints(inputs: Inputs.OCCT.ArcEdgeCircleTwoPointsDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.arcFromCircleAndTwoPoints", inputs);
    }

    /**
     * Creates an arc edge between two alpha angles on a circle
     * @param inputs two angles and circle edge
     * @returns OpenCascade edge
     * @group primitives
     * @shortname arc from circle and angles
     * @drawable true
     */
    arcFromCircleAndTwoAngles(inputs: Inputs.OCCT.ArcEdgeCircleTwoAnglesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.arcFromCircleAndTwoAngles", inputs);
    }

    /**
     * Creates an arc edge between the point on a circle and a given alpha angle
     * @param inputs point, circle edge and alpha angle
     * @returns OpenCascade edge
     * @group primitives
     * @shortname arc from circle point and angle
     * @drawable true
     */
    arcFromCirclePointAndAngle(inputs: Inputs.OCCT.ArcEdgeCirclePointAngleDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.arcFromCirclePointAndAngle", inputs);
    }

    /**
     * Creates OpenCascade circle edge
     * @param inputs Circle parameters
     * @returns OpenCascade circle edge
     * @group primitives
     * @shortname circle
     * @drawable true
     */
    createCircleEdge(inputs: Inputs.OCCT.CircleDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.createCircleEdge", inputs);
    }

    /**
     * Creates OpenCascade ellipse edge
     * @param inputs Ellipse parameters
     * @returns OpenCascade ellipse edge
     * @group primitives
     * @shortname ellipse
     * @drawable true
     */
    createEllipseEdge(inputs: Inputs.OCCT.EllipseDto): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.createEllipseEdge", inputs);
    }


    /**
     * Removes internal faces for the shape
     * @param inputs Shape
     * @returns OpenCascade shape with no internal edges
     * @group shapes
     * @shortname remove internal
     * @drawable true
     */
    removeInternalEdges(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSShapePointer>): Promise<Inputs.OCCT.TopoDSShapePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.removeInternalEdges", inputs);
    }

    /**
     * Creates an edge from geom curve and geom surface
     * @param inputs shapes are expected to contain 2 array elements - first is geom curve, second geom surface
     * @returns OpenCascade TopoDS_Edge
     * @group from
     * @shortname 2d curve and surface
     * @drawable true
     */
    makeEdgeFromGeom2dCurveAndSurface(inputs: Inputs.OCCT.CurveAndSurfaceDto<Inputs.OCCT.Geom2dCurvePointer, Inputs.OCCT.GeomSurfacePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.makeEdgeFromGeom2dCurveAndSurface", inputs);
    }

    /**
     * Gets the edge by providing an index from the shape
     * @param inputs Shape
     * @returns OpenCascade edge
     * @group get
     * @shortname get edge
     * @drawable true
     */
    getEdge(inputs: Inputs.OCCT.EdgeIndexDto<Inputs.OCCT.TopoDSShapePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdge", inputs);
    }
    /**
     * Gets the edges of a shape in a list
     * @param inputs Shape
     * @returns OpenCascade edge list
     * @group get
     * @shortname get edges
     * @drawable true
     */
    getEdges(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSShapePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdges", inputs);
    }

    /**
     * Gets the edges of a wire ordered along the direction of the wire
     * @param inputs wire shape
     * @returns OpenCascade edge list
     * @group get
     * @shortname get edges along wire
     * @drawable true
     */
    getEdgesAlongWire(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSWirePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgesAlongWire", inputs);
    }

    /**
     * Gets circular edges of a wire ordered along the direction of the wire
     * @param inputs wire shape
     * @returns OpenCascade edge list
     * @group get
     * @shortname get circular edges along wire
     * @drawable true
     */
    getCircularEdgesAlongWire(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSWirePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getCircularEdgesAlongWire", inputs);
    }

    /**
     * Gets linear edges of a wire ordered along the direction of the wire
     * @param inputs wire shape
     * @returns OpenCascade edge list
     * @group get
     * @shortname get linear edges along wire
     * @drawable true
     */
    getLinearEdgesAlongWire(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSWirePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getLinearEdgesAlongWire", inputs);
    }

    /**
     * Gets corner points of edges for a shape. There's no order guarantee here. All duplicates are removed, so when three edges form one corner, that will be represented by a single point in the list. 
     * @param inputs Shape that contains edges - wire, face, shell, solid
     * @returns List of points
     * @group get
     * @shortname corners
     * @drawable true
     */
    getCornerPointsOfEdgesForShape(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSShapePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getCornerPointsOfEdgesForShape", inputs);
    }

    /**
     * Gets the edge length
     * @param inputs edge
     * @returns Length
     * @group get
     * @shortname edge length
     * @drawable false
     */
    getEdgeLength(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<number> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgeLength", inputs);
    }

    /**
     * Gets the edge lengths of the shape
     * @param inputs shape
     * @returns Lengths
     * @group get
     * @shortname edge lengths of shape
     * @drawable false
     */
    getEdgeLengthsOfShape(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSShapePointer>): Promise<number[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgeLengthsOfShape", inputs);
    }

    /**
     * Gets the lengths of the edges
     * @param inputs edges
     * @returns Lengths
     * @group get
     * @shortname lengths
     * @drawable false
     */
    getEdgesLengths(inputs: Inputs.OCCT.ShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<number[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgesLengths", inputs);
    }

    /**
     * Gets the center of mass for the edge
     * @param inputs edge
     * @returns Point representing center of mass
     * @group get
     * @shortname center of mass
     * @drawable true
     */
    getEdgeCenterOfMass(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgeCenterOfMass", inputs);
    }

    /**
     * Gets the centers of mass for the edges
     * @param inputs edges
     * @returns Points representing centers of mass
     * @group get
     * @shortname centers of mass
     * @drawable true
     */
    getEdgesCentersOfMass(inputs: Inputs.OCCT.ShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getEdgesCentersOfMass", inputs);
    }

    /**
     * Gets the center point of the circular edge. If edge is not circular, point will not be returned.
     * @param inputs edge
     * @returns Point representing center of the circular edge
     * @group get circular edge
     * @shortname get center of circular edge
     * @drawable true
     */
    getCircularEdgeCenterPoint(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getCircularEdgeCenterPoint", inputs);
    }

    /**
     * Gets the radius of the circular edge. If edge is not circular, radius will not be returned.
     * @param inputs edge
     * @returns Radius of the circular edge
     * @group get circular edge
     * @shortname get radius of circular edge
     * @drawable false
     */
    getCircularEdgeRadius(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<number> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getCircularEdgeRadius", inputs);
    }

    /**
     * Gets the direction vector of the plane of the circular edge. If edge is not circular, direction vector will not be returned.
     * @param inputs edge
     * @returns Direction vector of the circular edge
     * @group get circular edge
     * @shortname get plane direction of circular edge
     * @drawable true
     */
    getCircularEdgePlaneDirection(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Vector3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.getCircularEdgePlaneDirection", inputs);
    }

    /**
     * Gets the point on edge at param
     * @param input edge
     * @returns Point on param
     * @group extract
     * @shortname point at param
     * @drawable true
     */
    pointOnEdgeAtParam(inputs: Inputs.OCCT.DataOnGeometryAtParamDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.pointOnEdgeAtParam", inputs);
    }

    /**
     * Gets the points on edges at param
     * @param input edges
     * @returns Points on param
     * @group extract
     * @shortname points on edges at param
     * @drawable true
     */
    pointsOnEdgesAtParam(inputs: Inputs.OCCT.DataOnGeometryesAtParamDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.pointsOnEdgesAtParam", inputs);
    }

    /**
     * Gets the points of all edges from a shape in separate lists for each edge
     * @param inputs Shape
     * @returns OpenCascade points lists
     * @group extract
     * @shortname edges to points
     * @drawable false
     */
    edgesToPoints(inputs: Inputs.OCCT.EdgesToPointsDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[][]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.edgesToPoints", inputs);
    }

    /**
     * Computes reversed edge from input edge
     * @param inputs Shape
     * @returns OpenCascade edge
     * @group get
     * @shortname reversed edge
     * @drawable true
     */
    reversedEdge(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSEdgePointer> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.reversedEdge", inputs);
    }

    /**
     * Gets the tangent vector on edge at param
     * @param input edge
     * @returns Tangent vector on param
     * @group extract
     * @shortname tangent at param
     * @drawable true
     */
    tangentOnEdgeAtParam(inputs: Inputs.OCCT.DataOnGeometryAtParamDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.tangentOnEdgeAtParam", inputs);
    }

    /**
     * Gets the tangent vectors on edges at param
     * @param input edges
     * @returns Tangent vectors on param
     * @group extract
     * @shortname tangents on edges at param
     * @drawable true
     */
    tangentsOnEdgesAtParam(inputs: Inputs.OCCT.DataOnGeometryesAtParamDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.tangentsOnEdgesAtParam", inputs);
    }

    /**
     * Gets the point on edge at length
     * @param input edge and length
     * @returns Point on edge
     * @group extract
     * @shortname point at length
     * @drawable true
     */
    pointOnEdgeAtLength(inputs: Inputs.OCCT.DataOnGeometryAtLengthDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.pointOnEdgeAtLength", inputs);
    }

    /**
     * Gets the points on edges at length
     * @param input edges and length
     * @returns Points on edges
     * @group extract
     * @shortname points at length
     * @drawable true
     */
    pointsOnEdgesAtLength(inputs: Inputs.OCCT.DataOnGeometryesAtLengthDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.pointsOnEdgesAtLength", inputs);
    }

    /**
     * Gets the tangent vector on edge at length
     * @param input edge and length
     * @returns Tangent vector on edge
     * @group extract
     * @shortname tangent at length
     * @drawable true
     */
    tangentOnEdgeAtLength(inputs: Inputs.OCCT.DataOnGeometryAtLengthDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.tangentOnEdgeAtLength", inputs);
    }

    /**
     * Gets the tangent vectors on edges at length
     * @param input edges and length
     * @returns Tangent vectors on edges
     * @group extract
     * @shortname tangents at length
     * @drawable true
     */
    tangentsOnEdgesAtLength(inputs: Inputs.OCCT.DataOnGeometryesAtLengthDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.tangentsOnEdgesAtLength", inputs);
    }

    /**
     * Gets the start point on edge
     * @param input edge
     * @returns Start point
     * @group extract
     * @shortname start point
     * @drawable true
     */
    startPointOnEdge(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.startPointOnEdge", inputs);
    }

    /**
     * Gets the start points on edges
     * @param input edges
     * @returns Start points
     * @group extract
     * @shortname start points
     * @drawable true
     */
    startPointsOnEdges(inputs: Inputs.OCCT.ShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.startPointsOnEdges", inputs);
    }

    /**
     * Gets the end point on edge
     * @param input edge
     * @returns End point
     * @group extract
     * @shortname end point
     * @drawable true
     */
    endPointOnEdge(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.endPointOnEdge", inputs);
    }

    /**
     * Gets the end points on edges
     * @param input edges
     * @returns End points
     * @group extract
     * @shortname end points
     * @drawable true
     */
    endPointsOnEdges(inputs: Inputs.OCCT.ShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.endPointsOnEdges", inputs);
    }

    /**
     * Divides edge by params to points
     * @param input edge and division params
     * @returns Points
     * @group extract
     * @shortname points by params
     * @drawable true
     */
    divideEdgeByParamsToPoints(inputs: Inputs.OCCT.DivideDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.divideEdgeByParamsToPoints", inputs);
    }

    /**
     * Divides edges by params to points
     * @param input edges and division params
     * @returns Points
     * @group extract
     * @shortname points by params on edges
     * @drawable false
     */
    divideEdgesByParamsToPoints(inputs: Inputs.OCCT.DivideShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[][]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.divideEdgesByParamsToPoints", inputs);
    }

    /**
     * Divides edge by length to points
     * @param input edge and division params
     * @returns Points
     * @group extract
     * @shortname points by distance
     * @drawable true
     */
    divideEdgeByEqualDistanceToPoints(inputs: Inputs.OCCT.DivideDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.divideEdgeByEqualDistanceToPoints", inputs);
    }

    /**
     * Divides edges by length to points
     * @param input edges and division params
     * @returns Points
     * @group extract
     * @shortname points by distance on edges
     * @drawable false
     */
    divideEdgesByEqualDistanceToPoints(inputs: Inputs.OCCT.DivideShapesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.Base.Point3[][]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.divideEdgesByEqualDistanceToPoints", inputs);
    }

    /**
     * Creates lines from two given points till circle tangent locations
     * @param input resulting lines
     * @returns lines
     * @group constraint
     * @shortname tan lines from 2 pts to circle
     * @drawable true
     */
    constraintTanLinesFromTwoPtsToCircle(inputs: Inputs.OCCT.ConstraintTanLinesFromTwoPtsToCircleDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSShapePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.constraintTanLinesFromTwoPtsToCircle", inputs);
    }

    /**
     * Creates lines from a given point till circle tangent locations
     * @param input resulting lines
     * @returns lines
     * @group constraint
     * @shortname tan lines from pt to circle
     * @drawable true
     */
    constraintTanLinesFromPtToCircle(inputs: Inputs.OCCT.ConstraintTanLinesFromPtToCircleDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSShapePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.constraintTanLinesFromPtToCircle", inputs);
    }

    /**
     * Creates tangent lines between two circles.
     * @param input resulting lines
     * @returns lines
     * @group constraint
     * @shortname tan lines on two circles
     * @drawable true
     */
    constraintTanLinesOnTwoCircles(inputs: Inputs.OCCT.ConstraintTanLinesOnTwoCirclesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSShapePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.constraintTanLinesOnTwoCircles", inputs);
    }

    /**
     * Creates tangent circles between two circles.
     * @param input resulting circles
     * @returns circles
     * @group constraint
     * @shortname tan circles on two circles
     * @drawable true
     */
    constraintTanCirclesOnTwoCircles(inputs: Inputs.OCCT.ConstraintTanCirclesOnTwoCirclesDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSShapePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.constraintTanCirclesOnTwoCircles", inputs);
    }

    /**
     * Creates tangent circles between a point and a circle.
     * @param input resulting circles
     * @returns circles
     * @group constraint
     * @shortname tan circles on circle and pnt
     * @drawable true
     */
    constraintTanCirclesOnCircleAndPnt(inputs: Inputs.OCCT.ConstraintTanCirclesOnCircleAndPntDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<Inputs.OCCT.TopoDSShapePointer[]> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.constraintTanCirclesOnCircleAndPnt", inputs);
    }

    /**
     * Checks whether an edge is linear
     * @param input edge
     * @returns boolean if is linear
     * @group is
     * @shortname is edge linear
     * @drawable false
     */
    isEdgeLinear(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<boolean> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.isEdgeLinear", inputs);
    }

    /**
     * Checks whether an edge is circular
     * @param input edge
     * @returns boolean if is circular
     * @group is
     * @shortname is edge circular
     * @drawable false
     */
    isEdgeCircular(inputs: Inputs.OCCT.ShapeDto<Inputs.OCCT.TopoDSEdgePointer>): Promise<boolean> {
        return this.occWorkerManager.genericCallToWorkerPromise("shapes.edge.isEdgeCircular", inputs);
    }


}