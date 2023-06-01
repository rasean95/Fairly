USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[AppointmentTypes_SelectAll]    Script Date: 5/2/2023 10:48:10 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Rasean Rhone
-- Create date: 04/25/2023
-- Description: Selecting all AppointmentTypes.
-- Code Reviewer: Andy Chipres
-- =============================================
CREATE proc [dbo].[AppointmentTypes_SelectAll]

as

/*----Test Code----

	Execute [dbo].[AppointmentTypes_SelectAll]

*/

BEGIN

	SELECT	[Id]
		,[Name]

	FROM [dbo].[AppointmentTypes]

END
GO
