﻿USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[Appointments_Delete]    Script Date: 4/13/2023 4:39:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Rasean Rhone
-- Create date: 04/10/2023
-- Description:	Updating the status of appointment to removed.
-- Code Reviewer: Dustin Polk
-- =============================================

ALTER proc [dbo].[Appointments_Delete]
					@Id int




/*-----Test Code----


	Declare @Id int = '8';

	Execute dbo.Appointments_Delete @Id

	

*/


as

BEGIN


	Declare @datMod datetime2(7) = getutcdate();

	Update dbo.Appointments
			Set [StatusTypesId] = 5


	Where Id = @Id


END

GO
