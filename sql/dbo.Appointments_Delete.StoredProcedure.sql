USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[Appointments_Delete]    Script Date: 4/13/2023 4:39:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:	Rasean Rhone
-- Create date: 04/10/2023
-- Description:	Updating the status of appointment to removed.
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Appointments_Delete]
						@Id int




/*-----Test Code----


	Declare @Id int = '7'
			,@StatusTypesId int = '1'

	Execute dbo.Appointments_Delete @StatusTypesId, @ModifiedBy, @Id

	Select	*
	From dbo.Appointments

*/


as

BEGIN

	Declare @datMod datetime2(7) = getutcdate();

	Update dbo.Appointments
			Set [StatusTypesId] = 5


	Where Id = @Id


END
GO
